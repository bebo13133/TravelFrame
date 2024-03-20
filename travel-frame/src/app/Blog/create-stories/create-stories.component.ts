import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-stories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-stories.component.html',
  styleUrl: './create-stories.component.css'
})
export class CreateStoriesComponent implements OnInit {
  storyForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.storyForm = this.fb.group({
      destination: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      image: [''], // Може да добавите Validators.required, ако снимката е задължителна
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.storyForm.valid) {
      console.log(this.storyForm.value);
      // Обработка на данните от формата
    }
  }
}
