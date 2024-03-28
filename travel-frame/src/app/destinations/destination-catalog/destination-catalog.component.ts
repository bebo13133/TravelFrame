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
  const userId = localStorage.getItem('userId'); // или друг метод за получаване на userId
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
      // Инициализиране или изчистване на състоянието на isFavorite преди зареждане
      this.isFavorite = {}; // Може да пропуснете това, ако не искате да изчиствате предишни стойности
  
      // Филтриране на фаворитите по _ownerId, за да получите само тези, които са създадени от текущия потребител
      const userFavorites = allFavorites.filter(favorite => favorite._ownerId === userId);
  
      // Обхождане на филтрираните фаворити и маркиране на съответните дестинации като favorited
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
        });
      } else {
        console.error('Favorite ID is undefined, cannot delete favorite');
      }
    } else {
      this.favoritesService.addToFavorites(destinationId).subscribe((response: any) => {
        const favoriteId = response._id;
        this.isFavorite[destinationId] = { favorited: true, favoriteId: favoriteId };
        console.log('Added to favorites!', this.isFavorite);
      });
    }
  }
  
}
