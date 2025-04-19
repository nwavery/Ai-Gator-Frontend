import { Injectable, inject, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private renderer2: Renderer2;
  private isBrowser: boolean;

  // Default base title, can be customized
  private baseTitle = 'AI-Gator';
  private currentSchemaTag: HTMLScriptElement | null = null;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Need Renderer2 for manipulating DOM (adding script tag)
    this.renderer2 = this.rendererFactory.createRenderer(null, null);
    // Check if running in browser for direct DOM manipulation
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Sets the page title
  setTitle(title: string, includeBase = true): void {
    const finalTitle = includeBase ? `${title} | ${this.baseTitle}` : title;
    this.titleService.setTitle(finalTitle);
  }

  // Sets the meta description tag
  // Optionally updates Open Graph and Twitter card descriptions too
  setDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
    // Basic Open Graph description
    this.metaService.updateTag({ property: 'og:description', content: description });
    // Basic Twitter card description
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }

  // Example for setting Open Graph title (can be expanded)
  setOgTitle(title: string): void {
     // Always includes the base title for OG/Twitter for consistency
     const finalTitle = `${title} | ${this.baseTitle}`;
     this.metaService.updateTag({ property: 'og:title', content: finalTitle });
     this.metaService.updateTag({ name: 'twitter:title', content: finalTitle });
  }

  // Sets the Open Graph and Twitter image tags
  setOgImage(imageUrl: string): void {
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
    // Optionally add twitter:image:alt if you have alt text
    // this.metaService.updateTag({ name: 'twitter:image:alt', content: 'Alt text for image' });
  }

  // Sets JSON-LD structured data
  setStructuredData(data: object): void {
    // Only manipulate DOM directly if in the browser
    if (!this.isBrowser) {
      return;
    }

    // Remove existing schema script if present
    if (this.currentSchemaTag) {
      this.renderer2.removeChild(this.document.head, this.currentSchemaTag);
      this.currentSchemaTag = null;
    }

    // Create and append the new script
    const script = this.renderer2.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer2.appendChild(this.document.head, script);
    this.currentSchemaTag = script;
  }
  
  // Clears structured data (e.g., when navigating away)
  clearStructuredData(): void {
     if (this.isBrowser && this.currentSchemaTag) {
       this.renderer2.removeChild(this.document.head, this.currentSchemaTag);
       this.currentSchemaTag = null;
     }
  }

  // TODO: Add methods for other meta tags (og:image, twitter:card, canonical URLs, structured data etc.)

}
