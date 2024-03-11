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
  currentFormSection = 1; 
  totalFormSections = 3;
  imagesPreview: string[] = []; 
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      image: [null],
      title: ['', Validators.required],
      paragraph: ['', Validators.required],
      "title-desc": ['', Validators.required],
      'info-desc': ['', Validators.required],
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
  onImagesChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.imagesPreview = []; 
    if (files && files.length <= 4) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesPreview.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    } else {

      console.error("Можете да качите максимум 4 снимки.");
    }
  }

  onSubmit() {
   
    console.log(this.createForm.value);
  }
  goToNextSection() {
    if(this.currentFormSection < this.totalFormSections) {
      this.currentFormSection++;
    }
  
  }

  goToPreviousSection() {
    if(this.currentFormSection > 1) {
      this.currentFormSection--;
    }
  
  }
}
