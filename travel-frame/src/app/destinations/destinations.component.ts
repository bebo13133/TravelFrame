import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DestinationCatalogComponent } from './destination-catalog/destination-catalog.component';
import { SliderCatalogComponent } from './slider-catalog/slider-catalog.component';
import { Destination } from '../types/destination';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule,DestinationCatalogComponent,SliderCatalogComponent],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent {
  destinations: Destination[] = []
  @Input() destinationId: string | null = null;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDestinations().subscribe(destinations => {
      console.log(destinations)
      this.destinations = destinations;
    })
  }
}
