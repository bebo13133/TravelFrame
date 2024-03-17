import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-destination',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,AuthenticatedComponent],
  templateUrl: './edit-destination.component.html',
  styleUrl: './edit-destination.component.css'
})
export class EditDestinationComponent implements OnInit {
  createForm!: FormGroup;
  imagePreview: string | ArrayBuffer = '';
  currentFormSection = 1;
  totalFormSections = 4;
  imagesPreview: string[] = [];
  dayImages: { previews: string[] }[] = [];
  currentDayIndex: number = 0;
  destinationId: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) { 
    this.createForm = this.fb.group({
      image: [null],
      title: ['', Validators.required],
      paragraph: ['', Validators.required],
      "title-desc": ['', Validators.required],
      'info-desc': ['', Validators.required],
      'images': [null],
      dateRange: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required]
      }),
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
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
// edit logic


ngOnInit(): void {
  this.destinationId = this.route.snapshot.paramMap.get('destinationId');
  if (this.destinationId) {
    this.loadDestinationDetails(this.destinationId);
  }
}


loadDestinationDetails(destinationId: string): void {
  this.apiService.getDestinationById(destinationId).subscribe({
    next: (destinationData) => {
      // Попълване на основните полета на формата
      this.createForm.patchValue({
        title: destinationData.title,
        paragraph: destinationData.paragraph,
 
        "title-desc": destinationData["title-desc"],
        'info-desc': destinationData['info-desc'],
        // Прескачаме полето за изображения, тъй като то може да изисква специално обработване
        dateRange: {
          start: destinationData.dateRange.start,
          end: destinationData.dateRange.end,
        },
        price: destinationData.price,
        conditions: {
          ticketsIncluded: destinationData.conditions.ticketsIncluded,
          allTransportCosts: destinationData.conditions.allTransportCosts,
          accommodations: destinationData.conditions.accommodations,
          allMeals: destinationData.conditions.allMeals,
          practices: destinationData.conditions.practices,
          atvTour: destinationData.conditions.atvTour,
          spaAccess: destinationData.conditions.spaAccess,
          guidesIncluded: destinationData.conditions.guidesIncluded,
          medicalInsurance: destinationData.conditions.medicalInsurance,
          personalExpenses: destinationData.conditions.personalExpenses,
          alcoholicBeverages: destinationData.conditions.alcoholicBeverages,
          unspecifiedServices: destinationData.conditions.unspecifiedServices,
          additionalActivitiesFee: destinationData.conditions.additionalActivitiesFee,
          cancellationInsurance: destinationData.conditions.cancellationInsurance
        }
      
      });
  
      const daysFormArray = this.createForm.get('days') as FormArray;
      daysFormArray.clear(); // Премахнете всички текущи FormGroup елементи
      destinationData.days.forEach(day => {
        const dayFormGroup = this.fb.group({
          dayImage: [day.dayImage],
          dayTitle: [day.dayTitle, Validators.required],
          dayInfo: [day.dayInfo, Validators.required]
        });
        daysFormArray.push(dayFormGroup);
      });

      if (destinationData.images && destinationData.images.length) {

this.imagePreview = Array.isArray(destinationData.image) ? destinationData.image[0] : destinationData.image;


this.imagesPreview = Array.isArray(destinationData.images) ? destinationData.images : [destinationData.images];

      }
    },
    error: (error) => {
      console.error('Error loading destination details:', error);

    }
  });
}


  // Submit logic
  // ngOnInit() {
  //   this.createForm = this.fb.group({
  //     image: [null],
  //     title: ['', Validators.required],
  //     paragraph: ['', Validators.required],
  //     "title-desc": ['', Validators.required],
  //     'info-desc': ['', Validators.required],
  //     'images': [null],
  //     dateRange: this.fb.group({
  //       start: ['', Validators.required],
  //       end: ['', Validators.required]
  //     }),
  //     price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  //     conditions: this.fb.group({
  //       ticketsIncluded: [false],
  //       allTransportCosts: [false],
  //       accommodations: [false],
  //       allMeals: [false],
  //       practices: [false],
  //       atvTour: [false],
  //       spaAccess: [false],
  //       guidesIncluded: [false],
  //       medicalInsurance: [false],
  //       personalExpenses: [false],
  //       alcoholicBeverages: [false],
  //       unspecifiedServices: [false],
  //       additionalActivitiesFee: [false],
  //       cancellationInsurance: [false]
  //     }),
  //     days: this.fb.array([this.initDayForm()]),

  //   });
  //   // console.log('fs', this.createForm.value)
  // }

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

    // prowerki

        // console.log('status',this.createForm.status); // Покажете общия статус на формата
    // console.log('formValue',this.createForm.value); // Покажете стойностите на формата
    // console.log('errors',this.createForm.errors); // Покажете грешките на формата, ако има такива
  
    // if (this.createForm.invalid) {
    //   console.log('controles',this.createForm.controls); // Ще покаже статуса на всички контроли
    // }
    // const days = this.createForm.get('days') as FormArray;
    // let isValid = true;
  
    // days.controls.forEach((dayFormGroup, index) => {
    //   if (!dayFormGroup.valid) {
    //     console.log(`Day ${index + 1} is not valid.`);
    //     isValid = false;
    //   }
    // });
  
    // if (!isValid) {
    //   console.log('There are invalid days. Cannot submit.');
    //   return;
    // }






    if (this.createForm.valid && this.destinationId != null) {
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

 
      this.apiService.editDestination(formData, this.destinationId).subscribe({
        next: (response) => {
          console.log('Destination created successfully', response);

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
