import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TiltDirective } from '../../../shared/directives/tilt.directive';
import { ApiService } from '../../../services/api.service';
import { Destination } from '../../../types/destination';
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-images-hero-rows',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './images-hero-rows.component.html',
  styleUrl: './images-hero-rows.component.css',
})
export class ImagesHeroRowsComponent implements OnInit{
  displayedDestinations:Destination[]= [];
  constructor(private apiService:ApiService, private favoritesService:FavoritesService){}
ngOnInit(): void {
  this.loadDestinations()
  this.favoritesService.favoritesUpdated$.subscribe(() => {
    this.loadDestinations(); // Повторно зареждане на дестинациите при промяна на фаворитите
  });
  console.log(" this.displayedDestination",  this.displayedDestinations)

}

  loadDestinations(): void {
  this.apiService.getDestinations().subscribe((destinations)=>{
    
    this.favoritesService.getAllFavorites().subscribe((favorites)=>{
      const favoriteDestinationIds = new Set(favorites.map(fav=>fav.destinationId)) //взимам destinationId на всички favorites

      const destinationsWithFavorites = destinations.filter(destination=>favoriteDestinationIds.has(destination._id)) // дестинации които са favorites
     console.log("destinationsWithFavorites",destinationsWithFavorites)
     
      const destinationsWithoutFavorites = destinations.filter(destination=>!favoriteDestinationIds.has(destination._id)) // които не са 


      this.displayedDestinations = [...destinationsWithFavorites, ...destinationsWithoutFavorites].slice(0, 4); // първа дестинациите с favorite, защото искам първо тях да взема
   
    })
  })
  }

}
