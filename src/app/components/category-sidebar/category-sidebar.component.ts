import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for async pipe and *ngFor
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-category-sidebar',
  standalone: true, // Make sure it's standalone
  imports: [CommonModule], // Add CommonModule
  templateUrl: './category-sidebar.component.html',
  styleUrl: './category-sidebar.component.scss'
})
export class CategorySidebarComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private filterService = inject(FilterService);

  categories$!: Observable<Category[]>; // Use definite assignment assertion
  selectedCategory: string | null = null;
  private filterSub: Subscription | undefined;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.filterSub = this.filterService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
  }

  selectCategory(categoryName: string | null): void {
    this.filterService.selectCategory(categoryName);
  }

  // Optional: Unsubscribe in ngOnDestroy to prevent memory leaks
  ngOnDestroy(): void {
    this.filterSub?.unsubscribe();
  }
}
