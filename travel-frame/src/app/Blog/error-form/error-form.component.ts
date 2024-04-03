import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-form.component.html',
  styleUrl: './error-form.component.css'
})
export class ErrorFormComponent {
  @Input() storyForm!: FormGroup;
  formChangesSubscription!: Subscription;
  constructor() { }




  get errors(): string[] {
    const formErrors: string[] = [];

    // Name errors
    if (this.storyForm.get('destination')?.errors?.['minlength']) {
      formErrors.push(`Дестинацията трябва да е поне 2 символа.`);
    }

    // Email errors
    if (this.storyForm.get('title')?.errors?.['minlength']) {
      formErrors.push(`Заглавието трябва да е поне 4 символа.`);
    }
    if (this.storyForm.get('author')?.errors?.['minlength']) {
      formErrors.push(`Автора трябва да е поне 3 символа.`);
    }

    // Password errors
    if (this.storyForm.get('description')?.errors?.['minlength']) {
      formErrors.push(`Описанието трябва да е поне 20 символа.`);
    }

    // RepeatPassword match error

    return formErrors;
  }


  ngOnInit(): void {
    // Абониране за промени във формата
    this.formChangesSubscription = this.storyForm.valueChanges.subscribe(() => {
      // Промените тук не са необходими, тъй като Angular автоматично ще
      // преизчисли и рефлектира промените чрез getter-a за грешките.
    });
  }

  ngOnDestroy(): void {
    // Отписване от абонамента, за да се предотврати изтичане на памет
    this.formChangesSubscription.unsubscribe();
  }
}


