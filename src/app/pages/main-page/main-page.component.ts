import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { ToolListComponent } from '../../components/tool-list/tool-list.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    FilterBarComponent,
    ToolListComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private seoService = inject(SeoService);

  constructor() {}

  ngOnInit(): void {
    // Set SEO meta tags for the main page
    this.seoService.setTitle('Find the Best AI Tools');
    this.seoService.setDescription(
      'Your curated directory of AI tools. Discover software for productivity, creativity, business, and more.'
    );
    // Set OG title (optional, often covered by setTitle)
    this.seoService.setOgTitle('Find the Best AI Tools');
  }
}
