import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Tool } from '../../models/tool.model';
import { ToolService } from '../../services/tool.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-tool-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './tool-detail.component.html',
  styleUrl: './tool-detail.component.scss'
})
export class ToolDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private toolService = inject(ToolService);
  private seoService = inject(SeoService);

  tool$!: Observable<Tool>;
  private toolSubscription?: Subscription;

  ngOnInit(): void {
    this.tool$ = this.route.paramMap.pipe(
      switchMap(params => {
        const toolId = params.get('id');
        if (!toolId) {
          console.error('Tool ID not found in route parameters');
          throw new Error('Tool ID not found');
        }
        return this.toolService.getToolById(toolId);
      }),
      tap(tool => {
        if (tool) {
          const title = tool.name;
          const description = tool.description.substring(0, 160) + (tool.description.length > 160 ? '...' : '');
          
          this.seoService.setTitle(title);
          this.seoService.setDescription(description);
          this.seoService.setOgTitle(title);

          // Set OG Image if available
          if (tool.imageUrl) {
            this.seoService.setOgImage(tool.imageUrl);
          }

          // Set Structured Data (JSON-LD)
          const schema = {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description,
            applicationCategory: tool.category?.name, // Use category name
            operatingSystem: "Web", // Assuming web-based tools
            url: tool.websiteUrl,
            image: tool.imageUrl,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD', // Adjust if needed
              price: tool.pricing === 'Paid' ? 'Contact for price' : (tool.pricing === 'Free' ? '0' : 'Freemium/Contact') // Basic price logic
            }
            // Potential additions: aggregateRating, review
          };
          this.seoService.setStructuredData(schema);

        } else {
          this.seoService.setTitle('Tool Not Found');
          this.seoService.setDescription('The requested AI tool could not be found.');
          this.seoService.clearStructuredData(); // Clear schema if tool not found
        }
      })
    );

    this.toolSubscription = this.tool$.subscribe({
      error: (err) => {
        console.error('Error fetching tool:', err);
        this.seoService.setTitle('Error Finding Tool');
        this.seoService.setDescription('There was an error retrieving the tool details.');
        this.seoService.clearStructuredData(); // Clear schema on error
      }
    });
  }

  ngOnDestroy(): void {
    this.toolSubscription?.unsubscribe();
    // Clear structured data when leaving the component
    this.seoService.clearStructuredData(); 
  }
}
