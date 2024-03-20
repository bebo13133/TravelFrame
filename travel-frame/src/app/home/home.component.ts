import { Component, OnInit } from '@angular/core';
import { DescriptionComponent } from './description/description.component';
import { LastThreeComponent } from './last-three/last-three.component';
import { HeroComponent } from './hero/hero.component';
import { InfoHomeComponent } from './info-home/info-home.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { Destination } from '../types/destination';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DescriptionComponent,LastThreeComponent,HeroComponent,InfoHomeComponent,HomeCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  destinations: Destination []=[]
  isLoading = false
// private subscription: Subscription = new Subscription();


constructor(private apiService:ApiService){}
  ngOnInit(): void {
this.isLoading = true
  // this.subscription.add(
    this.apiService.getDestinations().subscribe({
      next:(destinations)=>{
        this.destinations = destinations
        console.log("Destinations",this.destinations)
        this.isLoading = false
      },
      error:(error)=>{
     
          console.error('Error fetching destinations:', error);
          this.isLoading = false;
       
      }
    })
  // )   
  }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe(); // Правилно анулиране на абонамента
  // }
}
