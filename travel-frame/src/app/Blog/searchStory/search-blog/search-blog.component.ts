import { Component, OnInit } from '@angular/core';
import { Story } from '../../../types/story.models';
import { ApiService } from '../../../services/api.service';
import { SearchStoryService } from '../../../services/search-story.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';
import { NumberToArrayPipe } from '../../../shared/pipes/number-array.pipe';
import { AsiseMenuStoriesComponent } from '../../stories/asise-menu-stories/asise-menu-stories.component';
import { ProfilePhotoService } from '../../../services/profile-photo.service';

@Component({
  selector: 'app-search-blog',
  standalone: true,
  imports: [SlicePipe, CommonModule, RouterLink,RouterModule,NumberToArrayPipe,AsiseMenuStoriesComponent],
  templateUrl: './search-blog.component.html',
  styleUrl: './search-blog.component.css'
})
export class SearchBlogComponent implements OnInit {
  isVisible: boolean = false;
  filteredLocationList: Story[] = [];
  stories: Story[] = []
  private isDataLoaded = false;
  paginatedList: Story[] = [];
  currentPage: number = 1;
  pageSize: number = 2;
  totalPages: number = 0;
  images$ = this.photoService.images$;

  constructor(private apiService: ApiService, private searchStoryService: SearchStoryService,
    private route: ActivatedRoute, 
    private router:Router,
    private photoService: ProfilePhotoService
    ) { }


  ngOnInit(): void {
    window.scrollTo({top:0})
    if (!this.isDataLoaded) {
      this.searchStoryService.searchStory$.subscribe(results => {

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
  // LoadData() {
  //   this.apiService.getStories().subscribe({
  //     next: (stories) => {
  //       this.stories = stories

  //       this.filteredLocationList = this.stories
        
  //   // this.updatePagination()

  //     },
  //     error: (error) => {
  //       console.error('Error fetching destinations:', error);
  //     }
  //   })

  // }

  LoadData() {
  
    this.photoService.fetchImagesMap().then(imagesMap => {
    
      this.apiService.getStories().subscribe({
        next: (stories) => {
        
          this.stories = stories.map(story => {
            const authorImage = imagesMap[story._ownerId] || 'път_към_стандартно_изображение';
            return { ...story, authorImage: authorImage };
          });
  
          this.filteredLocationList = this.stories;
          console.log("имг",this.filteredLocationList)
          // this.updatePagination()
        },
        error: (error) => {
          console.error('Error fetching stories:', error);
        }
      });
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
    queryParams: { page },
    queryParamsHandling: 'merge',
  }).then(() => {
    this.currentPage = page;
    this.updatePagination();
  });
}

 filterResult(text: string) {
  const trimmedText = text.trim();
  this.filteredLocationList = [...this.stories]; 
  // console.error(`Trimmed text: '${trimmedText}'`);


  if (!trimmedText) {
    this.filteredLocationList = this.stories;
  } else {
    this.filteredLocationList = this.stories.filter(
      location => location.title.toLowerCase().includes(trimmedText.toLowerCase())
      
    );
  }
  this.updatePagination();

   this.router.navigate(['/search-blog'])

 }



}
