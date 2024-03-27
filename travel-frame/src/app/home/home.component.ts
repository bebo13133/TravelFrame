import { Component, OnInit } from '@angular/core';
import { DescriptionComponent } from './description/description.component';
import { LastThreeComponent } from './last-three/last-three.component';
import { HeroComponent } from './hero/hero.component';
import { InfoHomeComponent } from './info-home/info-home.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { Destination } from '../types/destination';
import { ApiService } from '../services/api.service';


import { CommonModule } from '@angular/common';
import { HomeAsideComponent } from './home-aside/home-aside.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../spinner/spinner.service';
import { ProfilePhotoService } from '../services/profile-photo.service';
import { UserService } from '../User/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DescriptionComponent,LastThreeComponent,
    HeroComponent,InfoHomeComponent,
    HomeCarouselComponent,
    CommonModule,HomeAsideComponent,SpinnerComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  destinations: Destination []=[]
  isLoading = false
  private userId: string | undefined;
// private subscription: Subscription = new Subscription();
// filteredLocationList: Destination[] = [];

constructor(private apiService:ApiService,private route: ActivatedRoute, private spinnerService:SpinnerService, private photoService:ProfilePhotoService, private userService:UserService){
  this.userService.user$.subscribe(user => {
    this.userId = user?._id;
  });

  this.userService.user$.subscribe(user => {
    this.userId = user?._id;
    if (this.userId) {
 
      this.photoService.loadPhotoUrlFromStorage(this.userId);
    }
  });


  this.spinnerService.requestStarted()
  // this.subscription.add(
    this.apiService.getDestinations().subscribe({
      next:(destinations)=>{
        this.destinations = destinations
        console.log("Destinations",this.destinations)
        // this.isLoading = false

      },
      error:(error)=>{
     
          console.error('Error fetching destinations:', error);
          // this.spinnerService.resetSpinner()

       
      }
    })
  // this.filteredLocationList = this.destinations
  this.spinnerService.requestEnded()

}
  ngOnInit(): void {
    this.route.fragment.subscribe(frag => {
      if (frag) { 
        const element = document.getElementById(frag);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  // )   
  }



  

}
