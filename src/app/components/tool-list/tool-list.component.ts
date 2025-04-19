import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolService } from '../../services/tool.service';
import { Tool } from '../../models/tool.model';
import { Observable, Subscription, combineLatest, startWith } from 'rxjs';
import { ToolCardComponent } from '../tool-card/tool-card.component';
import { FilterService, SortOption, PricingOption } from '../../services/filter.service';

@Component({
  selector: 'app-tool-list',
  standalone: true,
  imports: [
    CommonModule,
    ToolCardComponent
  ],
  templateUrl: './tool-list.component.html',
  styleUrl: './tool-list.component.scss'
})
export class ToolListComponent implements OnInit, OnDestroy {
  private toolService = inject(ToolService);
  private filterService = inject(FilterService);
  private combinedSub: Subscription | undefined;

  tools$: Observable<Tool[]> | undefined;

  ngOnInit(): void {
    this.combinedSub = combineLatest([
      this.filterService.selectedCategories$.pipe(startWith([])),
      this.filterService.selectedSortBy$.pipe(startWith('newest' as SortOption)),
      this.filterService.selectedSearchTerm$.pipe(startWith('')),
      this.filterService.selectedPricing$.pipe(startWith([] as PricingOption[]))
    ]).subscribe(([categoryNames, sortBy, searchTerm, pricingOptions]) => {
      this.fetchTools(categoryNames, sortBy, searchTerm, pricingOptions);
    });
  }

  fetchTools(categoryNames: string[], sortBy: SortOption, searchTerm: string, pricingOptions: PricingOption[]): void {
    this.tools$ = this.toolService.getTools(categoryNames, sortBy, searchTerm, pricingOptions);
  }

  ngOnDestroy(): void {
    this.combinedSub?.unsubscribe();
  }

}
