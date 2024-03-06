import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // signUpForm: FormGroup;
  // signInForm: FormGroup;
  isRightPanelActive: boolean = false;

  constructor(private fb: FormBuilder) {
    // this.signUpForm = this.fb.group({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required]
    // });

    // this.signInForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required]
    // });
  }


  toggleRightPanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
  }
  // onSignUp(): void {
  //   // Тук добавете вашата логика за обработка на регистрацията
  //   console.log('Signing up', this.signUpForm.value);
  // }

  // // Празна функция за обработка на вход
  // onSignIn(): void {
  //   // Тук добавете вашата логика за обработка на входа
  //   console.log('Signing in', this.signInForm.value);
  // }
}
