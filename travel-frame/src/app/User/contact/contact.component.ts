import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmailFormComponent } from './email-form/email-form.component';
import { ContactMapComponent } from './contact-map/contact-map.component';
import { RouterLink } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [EmailFormComponent,CommonModule,ContactMapComponent,RouterLink,QuestionsComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
