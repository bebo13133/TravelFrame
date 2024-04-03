import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditErrorComponent } from './edit-error/edit-error.component';
import { notOnlyWhitespaceValidator } from '../validators/password-validator';

@Component({
  selector: 'app-edit-destination',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,AuthenticatedComponent,EditErrorComponent],
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
  isOwner: boolean = false;



  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) { 
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
      price: ['', [Validators.required, Validators.pattern(/^\d+$/),notOnlyWhitespaceValidator()]],
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
  window.scrollTo({top:0})
  this.destinationId = this.route.snapshot.paramMap.get('destinationId');
  if (this.destinationId) {
    this.loadDestinationDetails(this.destinationId);
    this.apiService.getDestinationById(this.destinationId).subscribe(destination => {
   
      const userId = localStorage.getItem('userId');
      // this.checkOwnership(destination._ownerId, userId);
      this.isOwner = destination._ownerId === userId;;
     
    })
  }
  
}
// checkOwnership(ownerId: string, userId: string | null): void {
//   if (ownerId !== userId) {
//     console.error('Edit error: User is not the owner of this destination.');
 
//   }
// }

loadDestinationDetails(destinationId: string): void {
  this.apiService.getDestinationById(destinationId).subscribe({
    next: (destinationData) => {
    
      this.createForm.patchValue({
        title: destinationData.title,
        paragraph: destinationData.paragraph,
 
        "title-desc": destinationData["title-desc"],
        'info-desc': destinationData['info-desc'],
    
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
      daysFormArray.clear(); 
      destinationData.days.forEach(day => {
        const dayFormGroup = this.fb.group({
          dayImage: [day.dayImage],
          dayTitle: [day.dayTitle,  [Validators.required,Validators.minLength(2)]],
          dayInfo: [day.dayInfo, [Validators.required,Validators.minLength(20)]]
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
    // const userId = localStorage.getItem('userId');


    //       this.isOwner = destination._ownerId === userId;;
    if (!this.isOwner) {
      console.error('Delete error: User is not the owner of this destination.', this.isOwner);
      return;
    }




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
          this.router.navigate([`destination/details/${this.destinationId}`])
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
