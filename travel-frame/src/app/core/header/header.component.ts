import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ImagesHeroRowsComponent } from './images-hero-rows/images-hero-rows.component';
import { Route, Router, RouterLink } from '@angular/router';
import { UserService } from '../../User/user.service';
import { ProfilePhotoService } from '../../services/profile-photo.service';
import { environment } from '../../../environments/access-key';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,ImagesHeroRowsComponent,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  scrolledDown = false;
  photoUrl: string | null = null;
  private userId: string | undefined;
  isAdmin: boolean = false;
  private subscription: Subscription;
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn
  }
  constructor(private userService:UserService, private router:Router, private photoService:ProfilePhotoService,private cdr: ChangeDetectorRef) { 
 
    
    // this.userService.user$.subscribe(user => {
    //   this.userId = user?._id;
    // });
    this.subscription = this.userService.user$.subscribe(user => {
      this.isAdmin = user?._id === environment.KEY;
    });
    this.userService.user$.subscribe(user => {
      this.userId = user?._id;
      if (this.userId) {

        // this.photoService.loadPhotoUrlFromStorage(this.userId);
      }
    });
    this.subscription = this.userService.user$.subscribe(user => {
      this.isAdmin = user?._id === environment.KEY;
    });
  }

  ngOnInit(): void {

    this.cdr.detectChanges();
    this.photoService.getPhotoUrl().subscribe(url => {
      this.photoUrl = url;
      console.log('Photo',this.photoUrl)
      this.cdr.detectChanges();
    });
 const userId = localStorage.getItem('userId');
  if (userId) {
   
    const savedPhotoUrl = localStorage.getItem(`profilePhoto_${userId}`);
    if (savedPhotoUrl) {
      this.photoUrl = savedPhotoUrl;
      this.cdr.detectChanges();
    } else {
      
      this.photoService.fetchImagesMap().then(imagesMap => {
        const profilePhotoUrl = imagesMap[userId];
        if (profilePhotoUrl) {
          this.photoUrl = profilePhotoUrl;
          localStorage.setItem(`profilePhoto_${userId}`, profilePhotoUrl); // Опционално: запазване в localStorage
          this.cdr.detectChanges();
        }
      }).catch(error => {
        console.error("Error fetching images map:", error);
      });
    }
  }


  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrolledDown = window.scrollY > 250; 
  }
  logout(){
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth']);

      },
      error: () => {
        this.router.navigate(['/auth']);

      },
    });
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Освобождава абонамента при унищожаване на компонента
  }
}
