import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [LoginComponent,RegisterComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css','../login/login.component.css', '../register/register.component.css']
})
export class AuthComponentComponent {
  isRightPanelActive: boolean = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService:UserService,private router:Router) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }
  toggleRightPanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
  }

  login() {
 
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response)=>{
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);
       
        }
      });
    }else{
      console.log('Form is not valid');
    }
  }

  register() {
 
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      this.userService.register( name, email, password ).subscribe({
        next: (response) =>{
          console.log('Registration successful', response);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });

      console.log('Register data', this.registerForm.value);
    }else{
      console.log('Form is not valid'); 
    }
  }
  // checkPasswords(group: FormGroup) { // тук user са форм контролите
  //   let pass = group.controls.password.value;
  //   let confirmPass = group.controls.repeatPassword.value;

  //   return pass === confirmPass ? null : { notSame: true }     
  // }
}
