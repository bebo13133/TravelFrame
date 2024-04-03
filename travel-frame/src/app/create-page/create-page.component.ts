import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { Router } from '@angular/router';
import { CreateErrorComponent } from './create-error/create-error.component';
import { notOnlyWhitespaceValidator } from '../validators/password-validator';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,AuthenticatedComponent,CreateErrorComponent]
})
export class CreatePageComponent implements OnInit {
  
  createForm!: FormGroup;
  imagePreview: string | ArrayBuffer = '';
  currentFormSection = 1;
  totalFormSections = 4;
  imagesPreview: string[] = [];
  dayImages: { previews: string[] }[] = [];
  currentDayIndex: number = 0;


  constructor(private fb: FormBuilder, private apiService: ApiService, private router:Router) { }

  ngOnInit() {
    window.scrollTo({top:0})
    this.createForm = this.fb.group({
      image: [null],
      title: ['', [Validators.required,Validators.minLength(2),notOnlyWhitespaceValidator()]],
      paragraph: ['', [Validators.required,Validators.minLength(10),notOnlyWhitespaceValidator()]],
      "title-desc": ['', [Validators.required,Validators.minLength(2),notOnlyWhitespaceValidator()]],
      'info-desc': ['', [Validators.required,Validators.minLength(2),notOnlyWhitespaceValidator()]],
      'images': [null],
      dateRange: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required]
      }),
      price: ['', [Validators.required, Validators.pattern(/^\d+$/),Validators.minLength(2),notOnlyWhitespaceValidator()]],
      conditions: this.fb.group({
        ticketsIncluded: [false],
        allTransportCosts: [false],
        accommodations: [false],
        allMeals: [false],
        practices: [false],
        atvTour: [false],
        spaAccess: [false],
        guidesIncluded: [false],
        medicalInsurance: [false],
        personalExpenses: [false],
        alcoholicBeverages: [false],
        unspecifiedServices: [false],
        additionalActivitiesFee: [false],
        cancellationInsurance: [false]
      }),
      days: this.fb.array([this.initDayForm()]),

    });
  
  }

  initDayForm(): FormGroup {
    return this.fb.group({
      dayImage: [null],
      dayTitle: ['', [Validators.required,Validators.minLength(2)]],
      dayInfo: ['', [Validators.required,Validators.minLength(20)]]
    });
  };
  goToDay(index: number) {
    this.currentDayIndex = index;
  }


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


  addDay() {
    const days = this.createForm.get('days') as FormArray;
    days.push(this.initDayForm());
    this.dayImages.push({ previews: [] });
  }
  
  removeDay(index: number) {
    const days = this.createForm.get('days') as FormArray;
    days.removeAt(index);
    this.dayImages.splice(index, 1);
  }
  
  onDayImageChange(event: Event, index: number) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.dayImages[index] = { previews: [] };
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.dayImages[index].previews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }
  getDayImagesPreviews(index: number): string[] {
    return this.dayImages[index]?.previews ?? [];
  }








  
  goToNextSection() {
    if (this.currentFormSection < this.totalFormSections) {
      this.currentFormSection++;
    }

  }

  goToPreviousSection() {
    if (this.currentFormSection > 1) {
      this.currentFormSection--;
    }

  }
  onSubmit() {

  
    if (this.createForm.valid) {
     
        // Тримване на всички текстови полета в формата
        Object.keys(this.createForm.controls).forEach(key => {
          const control = this.createForm.get(key);
          if (typeof control!.value === 'string') {
            control!.setValue(control!.value.trim());
          }
        });
      const formData = {
        ...this.createForm.value,
        image: this.imagePreview,
        images: this.imagesPreview,
        days: this.days.value.map((day: any, index: number) => {

          const dayImageObj = this.dayImages[index];
          return {
            ...day,
            dayImage: dayImageObj ? dayImageObj.previews : []
          };
        })
      };


      this.apiService.createDestination(formData).subscribe({
        next: (response) => {
          console.log('Destination created successfully', response);
          this.router.navigate(['destinations'])
        },
        error: (error) => {
          console.error('Error creating destination', error);

        }
      });
    } else {
      console.log('Form is not valid');

    }
  }

}
