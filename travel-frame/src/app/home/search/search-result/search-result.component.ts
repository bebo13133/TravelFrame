import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Destination } from '../../../types/destination';
import { DataRangePipe } from '../../../shared/pipes/data-range.pipe';
import { DescriptionComponent } from '../../description/description.component';
import { HeroComponent } from '../../hero/hero.component';
import { SearchHomeComponent } from '../search-home/search-home.component';
import { SearchDataService } from '../../../services/search-data.service';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { NumberToArrayPipe } from '../../../shared/pipes/number-array.pipe';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, DataRangePipe, DescriptionComponent, 
    HeroComponent, SearchHomeComponent,NumberToArrayPipe,RouterModule,RouterLink],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  constructor(private searchDataService: SearchDataService, 
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router:Router,
       
    ) {
    this.LoadData();

  }
  destinations: Destination[] = []
  filteredLocationList: Destination[] = [];
  paginatedList: Destination[] = [];
  currentPage: number = 1;
  pageSize: number = 2; 
  totalPages: number = 0;
  private isDataLoaded = false;

  ngOnInit() {

   

      if (!this.isDataLoaded) {
      this.searchDataService.searchResults$.subscribe(results => {
    
        this.filteredLocationList = results;
      });
      this.isDataLoaded = true;
      
    }
    console.log("this",this.filteredLocationList)
    // this.LoadData();
    this.route.queryParamMap.subscribe(params => {
      const page = params.get('page');
      this.currentPage = page ? parseInt(page, 10) : 1;
      this.LoadData();
    });
  }



  LoadData() {
    this.apiService.getDestinations().subscribe({
      next:(destinations) => {
        this.destinations = destinations;
        this.filteredLocationList = this.destinations;
        this.updatePagination();
      },
      error:(error) => {
        console.error('Error fetching destinations:', error);
      }
    });
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredLocationList.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredLocationList.length); // Гарантира, че не надхвърляме дължината

    this.paginatedList = []; 

    for (let i = startIndex; i < endIndex; i++) {
        this.paginatedList.push(this.filteredLocationList[i]);
    }
}
navigateToPage(page: number) {
  this.router.navigate([], { 
    relativeTo: this.route,
    queryParams: { page: page },
    queryParamsHandling: 'merge',
  });
}




  filterResults(text: string) {

    if (!text) {
      this.filteredLocationList = this.destinations;
    } else {
      this.filteredLocationList = this.destinations.filter(
        location => location.title.toLowerCase().includes(text.toLowerCase())
        
      );

    }
    this.updatePagination();
  
  }


}
