import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../validators/password-validator';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [LoginComponent,RegisterComponent,CommonModule,FormsModule,ReactiveFormsModule,FormErrorsComponent],
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
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['',[Validators.required, Validators.email, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    },{ validators: PasswordValidator.checkPasswords });
  }
  toggleRightPanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
  }

  login() {
 
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.email.trim(), this.loginForm.value.password.trim()).subscribe({
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

      this.userService.register( name.trim(), email.trim(), password.trim() ).subscribe({
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
