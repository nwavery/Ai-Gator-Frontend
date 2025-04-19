import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { ToolListComponent } from '../../components/tool-list/tool-list.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    FilterBarComponent,
    ToolListComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
