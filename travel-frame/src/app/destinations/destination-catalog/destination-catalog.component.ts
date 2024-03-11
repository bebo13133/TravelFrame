import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destination-catalog',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './destination-catalog.component.html',
  styleUrl: './destination-catalog.component.css'
})
export class DestinationCatalogComponent {
  currentSlide = 0;
  isFavorite = false;
  slides = [
    {
      title: "London",
      content: "London is the capital of the United Kingdom, with a population of just under 9 million. It is among the oldest of the world’s great cities and one of the most cosmopolitan. London is also great for travelers because there is no language barrier so it’s a nice way to ease into visiting a foreign country.",
      imageUrl: "/assets/media/london.jpg" // Replace with your local path or URL
    },
    {
      title: "London",
      content: "London is the capital of the United Kingdom, with a population of just under 9 million. It is among the oldest of the world’s great cities and one of the most cosmopolitan. London is also great for travelers because there is no language barrier so it’s a nice way to ease into visiting a foreign country.",
      imageUrl:  "/assets/media/london.jpg"  // Replace with your local path or URL
    },
    {
      title: "London",
      content: "London is the capital...",
      imageUrl: "/assets/media/beach2.webp"  // This should be the path relative to the src folder
    },
  ];

  moveSlide(direction: 'up' | 'down'): void {
    if (direction === 'up' && this.currentSlide > 0) {
      this.currentSlide--;
    } else if (direction === 'down' && this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    }
  }

  getSlideStyle(index: number): string {
    const offset = this.currentSlide * -70;
    return `translateY(${offset}vh)`;
  }


  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Тук добавете логиката за изпращане на заявката към сървъра ако е необходимо
  }
}
