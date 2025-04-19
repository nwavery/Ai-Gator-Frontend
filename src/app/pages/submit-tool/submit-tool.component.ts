import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-submit-tool',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './submit-tool.component.html',
  styleUrls: ['./submit-tool.component.scss']
})
export class SubmitToolComponent implements OnInit {
  toolForm: FormGroup;
  categories$: Observable<Category[]>;

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private seoService = inject(SeoService);

  constructor() {
    this.toolForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      websiteUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      category: [null, Validators.required],
      pricing: ['', Validators.required],
      tags: ['']
    });

    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {
    this.seoService.setTitle('Submit an AI Tool');
    this.seoService.setDescription('Add your AI tool to the AI-Gator directory. Share your creation with the community.');
    this.seoService.setOgTitle('Submit an AI Tool');
  }

  onSubmit(): void {
    if (this.toolForm.valid) {
      console.log('Form Submitted!', this.toolForm.value);
      // TODO: Send data to the backend service
      // Note: this.toolForm.value.category will contain the selected Category object (or its ID if we change the [ngValue] binding)
    } else {
      console.log('Form is invalid');
      this.toolForm.markAllAsTouched();
    }
  }
}
