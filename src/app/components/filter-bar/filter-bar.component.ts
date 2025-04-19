import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms'; // Needed for checkbox handling if using forms and search input
import { Observable, Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; // Import operators
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FilterService, SortOption, PricingOption } from '../../services/filter.service'; // Import SortOption and PricingOption

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // Import if using FormArray/FormGroup later
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent implements OnInit, OnDestroy {
  private categoryService = inject(CategoryService);
  private filterService = inject(FilterService);
  private subscriptions: Subscription[] = []; // Manage subscriptions

  // Category State
  categories$!: Observable<Category[]>;
  selectedCategories: Set<string> = new Set(); // Use a Set for efficient add/delete

  // Sort State
  isSortDropdownOpen = false;
  selectedSortOption: SortOption = 'newest'; // Default sort
  sortOptions: { value: SortOption, label: string }[] = [
    { value: 'newest', label: 'Date Added (Newest-Oldest)' },
    { value: 'upvoted', label: 'Most Upvoted' }, // Requires backend support
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
    { value: 'oldest', label: 'Date Added (Oldest-Newest)' }
  ];

  // Search State
  searchInput = new FormControl(''); // Use FormControl for easy handling

  // Pricing State
  pricingOptions: PricingOption[] = ['Free', 'Freemium', 'Paid']; // Define available options, excluding 'Contact'
  selectedPricing: Set<PricingOption> = new Set(); // Use Set for selected pricing

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    // Subscribe to sync UI with FilterService state
    this.subscriptions.push(
      this.filterService.selectedCategories$.subscribe(cats => this.selectedCategories = new Set(cats)),
      this.filterService.selectedSortBy$.subscribe(sort => this.selectedSortOption = sort),
      this.filterService.selectedSearchTerm$.subscribe(term => this.searchInput.setValue(term, { emitEvent: false })),
      this.filterService.selectedPricing$.subscribe(prices => this.selectedPricing = new Set(prices))
    );

    // Debounce search input changes
    this.subscriptions.push(
      this.searchInput.valueChanges.pipe(
        debounceTime(400), // Wait for 400ms pause in typing
        distinctUntilChanged() // Only emit if value has changed
      ).subscribe(searchTerm => {
        this.filterService.selectSearchTerm(searchTerm || '');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe()); // Unsubscribe from all
  }

  // Category Methods
  onCategoryChange(event: Event, categoryName: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCategories.add(categoryName);
    } else {
      this.selectedCategories.delete(categoryName);
    }
    // Convert Set to array before passing to service
    this.filterService.selectCategories(Array.from(this.selectedCategories));
  }

  // Sort Methods
  toggleSortDropdown(): void {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }

  selectSortOption(option: SortOption): void {
    if (this.selectedSortOption !== option) {
        this.selectedSortOption = option;
        this.filterService.selectSortBy(option);
    }
    this.isSortDropdownOpen = false; // Close dropdown after selection
  }

  getSelectedSortLabel(): string {
    return this.sortOptions.find(o => o.value === this.selectedSortOption)?.label || 'Sort';
  }

  // Optional: Close dropdown if clicking outside
  // Consider adding HostListener for document:click later

  // Pricing Methods
  onPricingChange(event: Event, pricingOption: PricingOption): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedPricing.add(pricingOption);
    } else {
      this.selectedPricing.delete(pricingOption);
    }
    this.filterService.selectPricing(Array.from(this.selectedPricing));
  }

  // We might add methods for other filters (search, pricing) later
}
