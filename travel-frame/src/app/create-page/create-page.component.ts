import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  dayImages: { previews: string[] }[] = [];
  currentDayIndex: number = 0; // Стартирайте от първия ден


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      image: [null],
      title: ['', Validators.required],
      paragraph: ['', Validators.required],
      "title-desc": ['', Validators.required],
      'info-desc': ['', Validators.required],
      'images': [null] ,
      days: this.fb.array([this.initDayForm()]),
      });
      this.dayImages.push({ previews: [] });
  }
  initDayForm(): FormGroup {
    return this.fb.group({
      dayImage: [null],
      dayTitle: ['', Validators.required],
      dayInfo: ['', Validators.required]
    });
  };
  goToDay(index: number) {
    this.currentDayIndex = index;
  }
  // Функция за добавяне на нов ден
  addDay() {
    const days = this.createForm.get('days') as FormArray;
    days.push(this.initDayForm());
    this.dayImages.push({ previews: [] });
  };

  // Функция за премахване на ден
  removeDay(index: number) {
    const days = this.createForm.get('days') as FormArray;
    if (days.length > 1) {
      days.removeAt(index);
      this.dayImages.splice(index, 1); // Премахваме снимките за деня
    }
  };
  nextDay() {
    if (this.currentDayIndex < this.days.length - 1) {
      this.currentDayIndex++;
    }
  }

  previousDay() {
    if (this.currentDayIndex > 0) {
      this.currentDayIndex--;
    }
  }
    // Функция за получаване на дните като FormArray
    get days(): FormArray {
      return this.createForm.get('days') as FormArray;
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
  };
  onDayImageChange(event: Event, dayIndex: number) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.dayImages[dayIndex].previews = []; // Изчистваме текущите превюта за деня
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          // Добавяме превюто към съответния ден
          this.dayImages[dayIndex].previews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
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
