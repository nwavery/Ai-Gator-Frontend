import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { SeoService } from '../../services/seo.service';
import { ToolService } from '../../services/tool.service';
import { Router } from '@angular/router';

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
  isSubmitting = false;
  submissionError: string | null = null;

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private seoService = inject(SeoService);
  private toolService = inject(ToolService);
  private router = inject(Router);

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
    if (this.toolForm.invalid || this.isSubmitting) {
      this.toolForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;

    // Transform the form data to match backend DTO (ToolCreateRequest)
    const rawValue = this.toolForm.value;
    const payload = {
      ...rawValue, // Spread the rest of the form values
      categoryId: rawValue.category?.id, // Extract category ID
      tags: rawValue.tags 
              ? rawValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '') 
              : [], // Split tags string into array, handle empty/null
    };
    // Remove the original category object from the payload
    delete payload.category; 

    // Send the transformed payload
    this.toolService.submitTool(payload).subscribe({
      next: (response) => {
        console.log('Submission accepted by backend.', response);
        this.isSubmitting = false;
        this.toolForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Submission failed:', err);
        this.isSubmitting = false;
        this.submissionError = 'Failed to submit tool. Please try again later.';
      }
    });
  }
}
