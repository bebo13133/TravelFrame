import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DestinationCatalogComponent } from './destination-catalog/destination-catalog.component';


@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule,DestinationCatalogComponent],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent {

}
