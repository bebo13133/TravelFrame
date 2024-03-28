import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DestinationCatalogComponent } from './destination-catalog/destination-catalog.component';
import { SliderCatalogComponent } from './slider-catalog/slider-catalog.component';
import { Destination } from '../types/destination';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UserService } from '../User/user.service';
import { FavoritesService } from '../services/favorites.service';


@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule,DestinationCatalogComponent,SliderCatalogComponent,SpinnerComponent],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent {
  destinations: Destination[] = []
  isLoading = false; 
  isFavorite:boolean= false

  @Input() destinationId: string | null = null;
  private subscription: Subscription = new Subscription();
  constructor(private apiService: ApiService, ) {
  
  }

  ngOnInit(): void {
    this.isLoading = true; 
    this.subscription.add(
      this.apiService.getDestinations().subscribe({
        next: (destinations) => {
          this.destinations = destinations;
          this.isLoading = false; 
        },
        error: (error) => {
          console.error('Error fetching destinations:', error);
          this.isLoading = false;
        }
      })
    );
}
ngOnDestroy(): void {
  this.subscription.unsubscribe(); 
}
}