import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tool } from '../models/tool.model'; // Import the Tool model
import { Category } from '../models/category.model'; // Import Category if needed for typing
import { SortOption, PricingOption } from './filter.service'; // Import SortOption and PricingOption
import { environment } from '../../environments/environment'; // <-- Import environment

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private http = inject(HttpClient); // Inject HttpClient
  private baseApiUrl = environment.backendApiUrl; // <-- Use environment variable

  constructor() { }

  getTools(
    categoryNames?: string[] | null,
    sortBy?: SortOption,
    searchTerm?: string | null,
    pricingOptions?: PricingOption[] | null // Add pricingOptions parameter
  ): Observable<Tool[]> {
    let params = new HttpParams();
    const toolsUrl = `${this.baseApiUrl}/tools`; // Construct full URL

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

    return this.http.get<Tool[]>(toolsUrl, { params });
  }

  // Method to get a single tool by its ID
  getToolById(id: string | number): Observable<Tool> {
    const toolUrl = `${this.baseApiUrl}/tools/${id}`; // Construct full URL
    return this.http.get<Tool>(toolUrl);
    // Add error handling (e.g., for 404 Not Found)
  }

  // Add methods later for getting categories, single tools, adding tools, etc.
}
