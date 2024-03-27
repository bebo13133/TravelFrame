import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, CommonModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm!: FormGroup<any>;

    constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userSubject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Изпращане на формата
      console.log(this.contactForm.value);
    } else {
      // Показване на съобщение за грешка
      console.log('Form is not valid');
    }
  }
}
