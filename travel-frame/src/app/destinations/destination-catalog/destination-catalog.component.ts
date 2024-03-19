import { CommonModule, SlicePipe } from '@angular/common';

import { Component, Input, OnInit, Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Destination } from '../../types/destination';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-destination-catalog',
  standalone: true,
  imports: [CommonModule,RouterLink,SlicePipe ],
  templateUrl: './destination-catalog.component.html',
  styleUrl: './destination-catalog.component.css'
})
export class DestinationCatalogComponent  {
  currentSlide = 0;
  isFavorite = false;
  @Input() destinations: Destination[] = [];
  constructor(private apiService: ApiService) {}




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


  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    //логиката за изпращане на заявката към сървъра ако е необходимо
  }
}
