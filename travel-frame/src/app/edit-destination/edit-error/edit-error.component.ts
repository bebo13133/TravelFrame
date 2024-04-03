import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-error.component.html',
  styleUrl: './edit-error.component.css'
})
export class EditErrorComponent {
  @Input() createForm!: FormGroup;
  // @Input() initDayForm!: FormGroup;

  formChangesSubscription!: Subscription;
  constructor() { }


  get daysFormArray(): FormArray {  // за да получa достъп до FormArray
    return this.createForm.get('days') as FormArray;
  }

  get errors(): string[] {
    const formErrors: string[] = [];
    if (this.createForm.touched || this.createForm.dirty) {
      
      if (this.createForm.invalid) {
        formErrors.push(`Формата не е довършена.`);
      }
    if (this.createForm.get('title')?.errors?.['minlength']) {
      formErrors.push(`Дестинацията трябва да е поне 2 символа.`);
    }
    if (this.createForm.get('paragraph')?.errors?.['minlength']) {
      formErrors.push(`Дестинацията трябва да е поне 10 символа.`);
    }
    if (this.createForm.get('price')?.errors?.['minlength']) {
      formErrors.push(`Дестинацията трябва да е поне 2 символа.`);
    }

    if (this.createForm.get('title-desc')?.errors?.['minlength']) {
      formErrors.push(`Заглавието трябва да е поне 2 символа.`);
    }
    if (this.createForm.get('info-desc')?.errors?.['minlength']) {
      formErrors.push(`Заглавието трябва да е поне 2 символа.`);
    }


    if (this.createForm.get('title')?.errors?.['maxLength']) {
      formErrors.push(`Дестинацията трябва да е макс 20 символа.`);
    }
    if (this.createForm.get('paragraph')?.errors?.['maxLength']) {
      formErrors.push(`Дестинацията трябва да е макс 300 символа.`);
    }
    if (this.createForm.get('price')?.errors?.['minlength']) {
      formErrors.push(`Дестинацията трябва да е поне 2 символа.`);
    }

    if (this.createForm.get('title-desc')?.errors?.['minlength']) {
      formErrors.push(`Заглавието трябва да е поне 2 символа.`);
    }
    if (this.createForm.get('info-desc')?.errors?.['minlength']) {
      formErrors.push(`Заглавието трябва да е поне 2 символа.`);
    }





    this.daysFormArray.controls.forEach((dayFormGroup, index) => { //итерирам през всички формуляри 
      if (dayFormGroup.get('dayTitle')?.errors?.['minlength']) {
        formErrors.push(`Ден ${index + 1}: Заглавието трябва да е поне 2 символа.`);
      }

      if (dayFormGroup.get('dayInfo')?.errors?.['minlength']) {
        formErrors.push(`Ден ${index + 1}: Описанието трябва да е поне 20 символа.`);
      }
    });
  }
    // RepeatPassword match error

    return formErrors;
  }


  ngOnInit(): void {

    this.formChangesSubscription = this.createForm.valueChanges.subscribe(() => {

    });
  }

  ngOnDestroy(): void {

    this.formChangesSubscription.unsubscribe();
  }
}
