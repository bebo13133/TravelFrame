import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, StoreModule, provideStore } from '@ngrx/store';

import { EffectsModule, provideEffects } from '@ngrx/effects';

import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { ErrorFormComponent } from '../error-form/error-form.component';
import { map, tap } from 'rxjs';
import { notOnlyWhitespaceValidator } from '../../validators/password-validator';
@Component({
  selector: 'app-create-stories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, StoreModule, EffectsModule, ErrorFormComponent, RouterLink],
  templateUrl: './create-stories.component.html',
  styleUrl: './create-stories.component.css',
  providers: [

  ],
})
export class CreateStoriesComponent {
  storyForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.storyForm = this.fb.group({
      destination: ['', [Validators.required, Validators.minLength(5),notOnlyWhitespaceValidator()]],
      title: ['', [Validators.required, Validators.minLength(4),notOnlyWhitespaceValidator()]],
      author: ['', [Validators.required, Validators.minLength(3),notOnlyWhitespaceValidator()]],
      image: [null],
      description: ['', [Validators.required, Validators.minLength(50),notOnlyWhitespaceValidator()]],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader(); // пробразувам го в стринг
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.storyForm.patchValue({ image: base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.storyForm.valid) {

      this.apiService.submitStory(this.storyForm.value).pipe(

        map(formValue => ({
          destination: formValue.destination.trim(),
          title: formValue.title.trim(),
          author: formValue.author.trim(),
          image: formValue.image,
          description: formValue.description.trim()
        })),

        tap(trimmedFormValue => console.log('Trimmed form values:', trimmedFormValue))
      ).subscribe({
        next: (response) => {
          console.log('Story submitted successfully', response);
          this.router.navigate(['/blog']);
        },
        error: (error) => console.error('Error submitting story', error)
      });
    }

  }
}
