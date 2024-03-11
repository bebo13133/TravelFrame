import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CreatePageComponent implements OnInit {
  createForm!: FormGroup;
  imagePreview: string | ArrayBuffer = '';
  currentFormSection = 1; // Стартова секция
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      image: [null],
      title: ['', Validators.required],
      paragraph: ['', Validators.required]
    });
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result!;
      };
      reader.readAsDataURL(file);
    }
  }

  // Метод за изпращане на формата
  onSubmit() {
    // Обработка на данните от формата тук
    console.log(this.createForm.value);
  }
  goToNextSection() {
    this.currentFormSection++;
  
  }

  goToPreviousSection() {
    this.currentFormSection--;
  
  }
}
