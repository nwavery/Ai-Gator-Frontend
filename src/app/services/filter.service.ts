import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tool } from '../models/tool.model'; // Import Tool to use Pricing type

export type SortOption = 'newest' | 'upvoted' | 'name_asc' | 'name_desc' | 'oldest' | null;
export type PricingOption = Tool['pricing']; // Use type from Tool model

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  // Store an array of selected category names
  private selectedCategoriesSource = new BehaviorSubject<string[]>([]); // Default to empty array
  selectedCategories$ = this.selectedCategoriesSource.asObservable();

  // Sort filter
  private selectedSortBySource = new BehaviorSubject<SortOption>('newest'); // Default sort
  selectedSortBy$ = this.selectedSortBySource.asObservable();

  // Search filter
  private selectedSearchTermSource = new BehaviorSubject<string>(''); // Default to empty string
  selectedSearchTerm$ = this.selectedSearchTermSource.asObservable();

  // Pricing filter
  private selectedPricingSource = new BehaviorSubject<PricingOption[]>([]); // Default to empty array
  selectedPricing$ = this.selectedPricingSource.asObservable();

  // Renamed method to reflect multiple categories
  selectCategories(categoryNames: string[]): void {
    this.selectedCategoriesSource.next(categoryNames);
  }

  // Optional: Method to clear all selections
  clearCategories(): void {
    this.selectedCategoriesSource.next([]);
  }

  selectSortBy(sortBy: SortOption): void {
    this.selectedSortBySource.next(sortBy);
  }

  selectSearchTerm(searchTerm: string): void {
    this.selectedSearchTermSource.next(searchTerm.trim()); // Trim whitespace
  }

  selectPricing(pricingOptions: PricingOption[]): void {
    this.selectedPricingSource.next(pricingOptions);
  }

  // Optional: Method to clear pricing
  clearPricing(): void {
    this.selectedPricingSource.next([]);
  }
}
