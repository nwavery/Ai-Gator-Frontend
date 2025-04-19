import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tool } from '../models/tool.model'; // Import the Tool model
import { Category } from '../models/category.model'; // Import Category if needed for typing
import { SortOption, PricingOption } from './filter.service'; // Import SortOption and PricingOption

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private http = inject(HttpClient); // Inject HttpClient
  private apiUrl = 'http://localhost:8080/api/tools'; // Backend API URL

  constructor() { }

  getTools(
    categoryNames?: string[] | null,
    sortBy?: SortOption,
    searchTerm?: string | null,
    pricingOptions?: PricingOption[] | null // Add pricingOptions parameter
  ): Observable<Tool[]> {
    let params = new HttpParams();

    // Append category names
    if (categoryNames && categoryNames.length > 0) {
      categoryNames.forEach(name => {
        params = params.append('categoryName', name);
      });
    }

    // Append sort parameter
    if (sortBy) {
      params = params.append('sortBy', sortBy);
    }

    // Append search term parameter if provided and not empty
    if (searchTerm) {
      params = params.append('search', searchTerm); // Use 'search' or adjust if backend expects different name
    }

    // Append pricing options
    if (pricingOptions && pricingOptions.length > 0) {
      pricingOptions.forEach(option => {
        params = params.append('pricing', option); // Use 'pricing' or adjust if backend expects different name
      });
    }

    return this.http.get<Tool[]>(this.apiUrl, { params });
  }

  // Method to get a single tool by its ID
  getToolById(id: string | number): Observable<Tool> {
    // Construct the URL for the specific tool
    const toolUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Tool>(toolUrl);
    // Add error handling (e.g., for 404 Not Found)
  }

  // Add methods later for getting categories, single tools, adding tools, etc.
}
