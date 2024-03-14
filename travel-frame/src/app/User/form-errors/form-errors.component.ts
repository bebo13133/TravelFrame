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

    // Name errors
    if (this.form.get('name')?.errors?.['minlength']) {
      formErrors.push(`Името трябва да е поне 4 символа.`);
    }

    // Email errors
    if (this.form.get('email')?.errors?.['minlength']) {
      formErrors.push(`Имейлът трябва да е поне 8 символа.`);
    }
    if (this.form.get('email')?.errors?.['email']) {
      formErrors.push(`Моля, въведете валиден имейл адрес.`);
    }

    // Password errors
    if (this.form.get('password')?.errors?.['minlength']) {
      formErrors.push(`Паролата трябва да е поне 6 символа.`);
    }

    // RepeatPassword match error
    if (this.form.errors?.['notSame']) {
      formErrors.push(`Паролите не съвпадат.`);
    }

    return formErrors;
  }


  ngOnInit(): void {
    // Абониране за промени във формата
    this.formChangesSubscription = this.form.valueChanges.subscribe(() => {
      // Промените тук не са необходими, тъй като Angular автоматично ще
      // преизчисли и рефлектира промените чрез getter-a за грешките.
    });
  }

  ngOnDestroy(): void {
    // Отписване от абонамента, за да се предотврати изтичане на памет
    this.formChangesSubscription.unsubscribe();
  }
}
