import { Component, Input } from '@angular/core';
import { Tool } from '../../models/tool.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './tool-card.component.html',
  styleUrl: './tool-card.component.scss'
})
export class ToolCardComponent {
  @Input() tool: Tool | undefined;
}
