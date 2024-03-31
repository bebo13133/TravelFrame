import { Component, OnInit } from '@angular/core';
import { Destination } from '../../types/destination';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SearchDataService } from '../../services/search-data.service';
import { UserService } from '../../User/user.service';

@Component({
  selector: 'app-search-home-modal',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './search-home-modal.component.html',
  styleUrl: './search-home-modal.component.css'
})
export class SearchHomeModalComponent implements OnInit {

  isVisible: boolean = false;
  filteredLocationList: Destination[] = [];
  destinations: Destination[] = []

constructor(private apiService:ApiService, private router:Router,private searchDataService: SearchDataService, private userService:UserService){
  this.loadData()
  
}
isLoggedIn: boolean = false;
ngOnInit(): void {
  this.isLoggedIn = this.userService.isLoggedIn;
  
}

loadData() {
  this.apiService.getDestinations().subscribe({
    next: (destinations) => {
      this.destinations = destinations

      this.filteredLocationList = this.destinations

      console.log('Error fetching destinations:', this.filteredLocationList);

    },
    error: (error) => {

      console.error('Error fetching destinations:', error);


    }
  })
}





  showModal(): void {
    if(this.isLoggedIn){
      this.isVisible = true;

    }else{
      this.router.navigate(['/destinations'])
    }

  }

  closeModal(): void {
    this.isVisible = false;
    console.log('show');

  }

  filterResults(text: string): void {
    const trimmedText = text.trim();
  this.filteredLocationList = [...this.destinations]; 

    if (!trimmedText) {
      this.filteredLocationList = this.destinations;
    } else {
      this.filteredLocationList = this.destinations.filter(
        destination => destination?.title.toLowerCase().includes(trimmedText.toLowerCase())
      );
      //  console.log('destinations:',  this.filteredLocationList);

    }

    this.searchDataService.setSearchResults(this.filteredLocationList);

this.closeModal()
    this.router.navigate(['/search-page'])

  }


}
