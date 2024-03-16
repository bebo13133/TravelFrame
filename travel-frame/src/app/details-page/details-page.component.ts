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
  destination: Destination| null = null;
  
constructor(private apiService:ApiService,  private route: ActivatedRoute){}

  ngOnInit() {
    // this.loadBackgroundImage();
    this.loadDestinationDetails();
  }

  // loadBackgroundImage() {
  //   // Предполагаме, че получавате URL-а на изображението от някаква заявка
  //   this.backgroundImageUrl = '/assets/media/desert.webp'; // като почна със заявките пътя ще го заместя динамично да я получава
  // }

  loadDestinationDetails() {
    // Вземете ID от URL
    const id = this.route.snapshot.paramMap.get('destinationId');
    if (id) {
      this.apiService.getDestinationById(id).subscribe({
        next: (destination: Destination) => {
          this.destination = destination;
          console.log(this.destination)
          // Предполагаме, че имате свойство 'backgroundImageUrl' във вашия модел
          if (destination.image instanceof File) {
            this.backgroundImageUrl = URL.createObjectURL(destination.image);
          } else {
            // Ако не е File, използвайте стойността директно или fallback
            this.backgroundImageUrl = destination.image || '/assets/media/default.jpg';
          }
        },
        error: (error) => {
          console.error('Error fetching destination details:', error);
          this.backgroundImageUrl = '/assets/media/error.jpg';
        }
      });
    }
  };


}
