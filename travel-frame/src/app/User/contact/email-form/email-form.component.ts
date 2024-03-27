import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, CommonModule,ReactiveFormsModule],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
      this.contactForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        subject: ['', Validators.required],
        message: ['', Validators.required]
      });
    }
    sendEmail(e: Event): void {
      e.preventDefault();
  
        const formData = e.target as HTMLFormElement;
  console.log(formData)
        emailjs.sendForm('service_zxhuqbx', 'template_7tkpsx5', formData, 'iRYFR4BuAXZEBF1ld')
          .then((response: any) => {
            console.log('Email sent successfully:', response);
            formData.reset();
          }, (error: any) => {
            console.error('Error sending email:', error);
          });
     
  }
}
