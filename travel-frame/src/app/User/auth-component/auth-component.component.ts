import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../validators/password-validator';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { NoAuthenticatedComponent } from '../../authenticated/no-authenticated/no-authenticated.component';
import { ProfilePhotoService } from '../../services/profile-photo.service';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [LoginComponent,RegisterComponent,CommonModule,FormsModule,ReactiveFormsModule,FormErrorsComponent,NoAuthenticatedComponent],
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css','../login/login.component.css', '../register/register.component.css']
})
export class AuthComponentComponent implements OnInit {
  isRightPanelActive: boolean = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  // private userId: string | undefined;
  photoUrl: string | null = null;
  constructor(private fb: FormBuilder, private userService:UserService,private router:Router, private photoService:ProfilePhotoService,private cdr: ChangeDetectorRef) {
    // this.userService.user$.subscribe(user => {
    //   this.userId = user?._id;
    //   if (this.userId) {
    //     // Зареждане на съхраненото URL при стартиране
    //     this.photoService.loadPhotoUrlFromStorage(this.userId);
    //   }
    // });

  }
  ngOnInit() {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
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


  // Вашият логин компонент

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email.trim();
      const password = this.loginForm.value.password.trim();
      
      this.userService.login(email, password).subscribe({
        next: async (response) => {
          console.log('Login successful', response);
          
          const userId = response._id;
          if (userId) {
            const savedPhotoUrl = localStorage.getItem(`profilePhoto_${userId}`);
            if (savedPhotoUrl) {
              this.photoUrl = savedPhotoUrl;
              this.cdr.detectChanges();
            } else {
              try {
                const imagesMap = await this.photoService.fetchImagesMap();
                const profilePhotoUrl = imagesMap[userId];
                if (profilePhotoUrl) {
                  this.photoUrl = profilePhotoUrl;
                  localStorage.setItem(`profilePhoto_${userId}`, profilePhotoUrl);
                  this.cdr.detectChanges();
                }
              } catch (error) {
                console.error("Error fetching images map:", error);
              }
            }
          }
          
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
  
  






  register() {
 
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      this.userService.register( name.trim(), email.trim(), password.trim() ).subscribe({
        next: (response) =>{
       
          this.router.navigate(['/home']);
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
