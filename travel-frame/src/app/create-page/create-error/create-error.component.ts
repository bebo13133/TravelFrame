import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-error.component.html',
  styleUrl: './create-error.component.css'
})
export class CreateErrorComponent {
  @Input() createForm!: FormGroup;
  // @Input() initDayForm!: FormGroup;

  formChangesSubscription!: Subscription;
  constructor() { }


  get daysFormArray(): FormArray {  // за да получa достъп до FormArray
    return this.createForm.get('days') as FormArray;
  }

  get errors(): string[] {
    const formErrors: string[] = [];

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

    // RepeatPassword match error

    return formErrors;
  }


  ngOnInit(): void {
    // Абониране за промени във формата
    this.formChangesSubscription = this.createForm.valueChanges.subscribe(() => {
      // Промените тук не са необходими, тъй като Angular автоматично ще
      // преизчисли и рефлектира промените чрез getter-a за грешките.
    });
  }

  ngOnDestroy(): void {
    // Отписване от абонамента, за да се предотврати изтичане на памет
    this.formChangesSubscription.unsubscribe();
  }
}

