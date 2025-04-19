import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Tool } from '../../models/tool.model';
import { ToolService } from '../../services/tool.service';

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
export class ToolDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private toolService = inject(ToolService);

  tool$!: Observable<Tool>;

  ngOnInit(): void {
    this.tool$ = this.route.paramMap.pipe(
      switchMap(params => {
        const toolId = params.get('id');
        if (!toolId) {
          throw new Error('Tool ID not found in route parameters');
        }
        return this.toolService.getToolById(toolId);
      })
    );
  }
}
