import { CommonModule, SlicePipe } from '@angular/common';

import { Component, Input, OnInit, Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Destination } from '../../types/destination';
import { pipe } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';
import { UserService } from '../../User/user.service';

@Component({
  selector: 'app-destination-catalog',
  standalone: true,
  imports: [CommonModule,RouterLink,SlicePipe ],
  templateUrl: './destination-catalog.component.html',
  styleUrl: './destination-catalog.component.css'
})
export class DestinationCatalogComponent implements OnInit {
  currentSlide = 0;
  // isFavorite = false;
  isFavorite: { [destinationId: string]: { favorited: boolean, favoriteId?: string } } = {};

  private userId: string | undefined;
  @Input() destinations: Destination[] = [];
  constructor(private apiService: ApiService,private userService: UserService, private favoritesService: FavoritesService) {
    this.userService.user$.subscribe(user => {
      this.userId = user?._id;
    });
  }
ngOnInit(): void {
  const userId = localStorage.getItem('userId'); // друг вариант е да го вземa от subject
  if (userId) {
    this.loadFavorites(userId);
  }
}



  moveSlide(direction: 'up' | 'down'): void {
    if (direction === 'up' && this.currentSlide > 0) {
      this.currentSlide--;
    } else if (direction === 'down' && this.currentSlide < this.destinations.length - 1) {
      this.currentSlide++;
    }
  }

  getSlideStyle(index: number): string {
    const offset = this.currentSlide * -70;
    return `translateY(${offset}vh)`;
  }

  loadFavorites(userId: string): void {
    this.favoritesService.getAllFavorites().subscribe(allFavorites => {
     
      this.isFavorite = {}; // Може да пропуснете това, ако не искам да изчистват предишни стойности
  
    // филтрирам favorites по ownerId за да получа само тези които аз съм харесал
      const userFavorites = allFavorites.filter(favorite => favorite._ownerId === userId);
  
    // обхождам favorites и ги разпределям по съответните дестинаци
      userFavorites.forEach(favorite => {
        this.isFavorite[favorite.destinationId] = { favorited: true, favoriteId: favorite._id };
      });
  
      console.log('isFavorite', this.isFavorite);
    });
  }
  



  toggleFavorite(destinationId: string): void {
    const currentFavorite = this.isFavorite[destinationId];
    console.log('Before:', this.isFavorite);
  
    if (currentFavorite && currentFavorite.favorited) {
      if (typeof currentFavorite.favoriteId === 'string') {
        this.favoritesService.removeFromFavorites(currentFavorite.favoriteId).subscribe(() => {
          this.isFavorite[destinationId] = { favorited: false };
          console.log('Removed from favorites!', this.isFavorite);
          this.favoritesService.notifyFavoritesUpdated()
        });
      } else {
        console.error('Favorite ID is undefined, cannot delete favorite');
      }
    } else {
      this.favoritesService.addToFavorites(destinationId).subscribe((response: any) => {
        const favoriteId = response._id;
        this.isFavorite[destinationId] = { favorited: true, favoriteId: favoriteId };
        this.favoritesService.notifyFavoritesUpdated()
        console.log('Added to favorites!', this.isFavorite);
      });
    }
  }
  
}
