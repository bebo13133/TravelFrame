import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css'
})
export class FormErrorsComponent implements OnInit{
  @Input() form!: FormGroup;
  formChangesSubscription!: Subscription;
  constructor() { }

  get errors(): string[] {
    const formErrors: string[] = [];
 
  

    if (this.form.touched || this.form.dirty) {

      // if (this.form.invalid) {
      //   formErrors.push(`Формата не е довършена.`);
      // }

    if (this.form.get('username')?.errors?.['minlength']) {
      formErrors.push(`Името трябва да е поне 4 символа.`);
    }

 
    if (this.form.get('email')?.errors?.['minlength']) {
      formErrors.push(`Имейлът трябва да е поне 8 символа.`);
    }
    if (this.form.get('email')?.errors?.['email']) {
      formErrors.push(`Моля, въведете валиден имейл адрес.`);
    }


    if (this.form.get('password')?.errors?.['minlength']) {
      formErrors.push(`Паролата трябва да е поне 6 символа.`);
    }


    if (this.form.errors?.['notSame']) {
      formErrors.push(`Паролите не съвпадат.`);
    }

  }
    return formErrors;
  }


  ngOnInit(): void {

    this.formChangesSubscription = this.form.valueChanges.subscribe(() => {

    });
  }

  ngOnDestroy(): void {

    this.formChangesSubscription.unsubscribe();
  }
}
