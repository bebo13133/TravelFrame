import { Component, Input } from '@angular/core';
import { Destination } from '../../../types/destination';
import { DestinationsComponent } from '../../../destinations/destinations.component';
import { DataRangePipe } from '../../../shared/pipes/data-range.pipe';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { SearchResultComponent } from '../search-result/search-result.component';
import { Router } from '@angular/router';
import { SearchDataService } from '../../../services/search-data.service';

@Component({
  selector: 'app-search-home',
  standalone: true,
  imports: [DataRangePipe,CommonModule,SearchResultComponent],
  templateUrl: './search-home.component.html',
  styleUrl: './search-home.component.css'
})
export class SearchHomeComponent {


  destinations: Destination []=[]
  isLoading = false
// private subscription: Subscription = new Subscription();
filteredLocationList: Destination[] = [];

constructor(private apiService:ApiService, private router:Router, private searchDataService:SearchDataService){
  this.isLoading = true
  // this.subscription.add(
    this.apiService.getDestinations().subscribe({
      next:(destinations)=>{
        this.destinations = destinations

     this.filteredLocationList = this.destinations

     
      },
      error:(error)=>{
     
          console.error('Error fetching destinations:', error);
       
       
      }
    })
  
}

filterResults(text: string) {
  if (!text) {
    this.filteredLocationList = this.destinations;
  } else {
    this.filteredLocationList = this.destinations.filter(
      location => location?.title.toLowerCase().includes(text.toLowerCase())
    );
  }
  
  // Споделяне на резултатите от търсенето чрез сервиса
  this.searchDataService.setSearchResults(this.filteredLocationList);
  this.router.navigate(['/search-page'])

}
  
}
