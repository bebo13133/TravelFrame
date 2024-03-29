import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Destination } from '../../../types/destination';
import { DataRangePipe } from '../../../shared/pipes/data-range.pipe';
import { DescriptionComponent } from '../../description/description.component';
import { HeroComponent } from '../../hero/hero.component';

import { SearchDataService } from '../../../services/search-data.service';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { NumberToArrayPipe } from '../../../shared/pipes/number-array.pipe';
import { HomeAsideComponent } from '../../home-aside/home-aside.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, DataRangePipe, DescriptionComponent,HeroComponent,NumberToArrayPipe,RouterModule,RouterLink,HomeAsideComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  isVisible: boolean = false;

  destinations: Destination[] = []
  filteredLocationList: Destination[] = [];
  paginatedList: Destination[] = [];
  currentPage: number = 1;
  pageSize: number = 2; 
  totalPages: number = 0;
  private isDataLoaded = false;


  constructor(private searchDataService: SearchDataService, 
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router:Router,
       
    ) {
    // this.LoadData();

  }


  ngOnInit() {
    if (!this.isDataLoaded) {
      this.searchDataService.searchResults$.subscribe(results => {

        this.filteredLocationList = results;
        //  this.paginatedList = this.filteredLocationList
    this.updatePagination()


      });
      this.isDataLoaded = true;


    }  

 
    this.route.queryParamMap.subscribe(params => {
      const page = params.get('page');
      this.currentPage = page ? parseInt(page, 10) : 1;
    });
    this.LoadData();

  }


  LoadData() {
    this.apiService.getDestinations().subscribe({
      next: (destinations) => {
        this.destinations = destinations

        this.filteredLocationList = this.destinations
        
    // this.updatePagination()

      },
      error: (error) => {
        console.error('Error fetching destinations:', error);
      }
    })

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
    queryParams: { page },
    queryParamsHandling: 'merge',
  }).then(() => {
    this.currentPage = page;
    this.updatePagination();
  });
}




filterResult(text: string) {
  const trimmedText = text.trim();
  this.filteredLocationList = [...this.destinations]; 
  console.error(`Trimmed text: '${trimmedText}'`);


  if (!trimmedText) {
    this.filteredLocationList = this.destinations;
  } else {
    this.filteredLocationList = this.destinations.filter(
      destination => destination.title.toLowerCase().includes(trimmedText.toLowerCase())
      
    );
  }
  this.updatePagination();

   this.router.navigate(['/search-page'])

 }


}
