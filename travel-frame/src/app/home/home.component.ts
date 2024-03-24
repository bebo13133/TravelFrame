import { Component, OnInit } from '@angular/core';
import { DescriptionComponent } from './description/description.component';
import { LastThreeComponent } from './last-three/last-three.component';
import { HeroComponent } from './hero/hero.component';
import { InfoHomeComponent } from './info-home/info-home.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { Destination } from '../types/destination';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { SearchHomeComponent } from './search/search-home/search-home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DescriptionComponent,LastThreeComponent,HeroComponent,InfoHomeComponent,HomeCarouselComponent,SearchHomeComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  destinations: Destination []=[]
  isLoading = false
// private subscription: Subscription = new Subscription();
// filteredLocationList: Destination[] = [];

constructor(private apiService:ApiService){
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
  // this.filteredLocationList = this.destinations
}
  ngOnInit(): void {

  // )   
  }

}
