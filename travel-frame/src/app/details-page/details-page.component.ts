import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PriceSideComponent } from './price-side/price-side.component';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Destination } from '../types/destination';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule,PriceSideComponent,AuthenticatedComponent,AsideMenuComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {
  backgroundImageUrl: string = '';
  destination: Destination | null = null;
  currentImageIndex: number = 0;
  intervalId: any;
  isOwner: boolean = false;
  
constructor(private apiService:ApiService,  private route: ActivatedRoute){}

  ngOnInit() {
    // this.loadBackgroundImage();
    this.loadDestinationDetails();
  }
  ngOnDestroy(): void {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      }


  loadDestinationDetails() {
 
    const id = this.route.snapshot.paramMap.get('destinationId');
    if (id) {
      this.apiService.getDestinationById(id).subscribe({
        next: (destination: Destination) => {
          this.destination = destination;
          // console.log(this.destination)
          const userId = localStorage.getItem('userId');

       
          this.isOwner = destination._ownerId === userId;
          if (destination.image instanceof File) {
            this.backgroundImageUrl = URL.createObjectURL(destination.image);
          } else {
       
            this.backgroundImageUrl = destination.image || '/assets/media/default.jpg';
          }
        this.startSlideshow();

        },
        error: (error) => {
          console.error('Error fetching destination details:', error);
          this.backgroundImageUrl = '/assets/media/error.jpg';
        }
      });
    }
  };

  startSlideshow(): void {

    const images = this.destination?.images ?? [];
    if (images.length > 1) {
      this.intervalId = setInterval(() => {

        this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
      }, 3000);
    }

}

}

