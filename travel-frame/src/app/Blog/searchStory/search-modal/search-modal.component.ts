import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Story } from '../../../types/story.models';
import { SearchStoryService } from '../../../services/search-story.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { StoriesComponent } from '../../stories/stories.component';
import { ProfilePhotoService } from '../../../services/profile-photo.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, StoriesComponent],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css'
})
export class SearchModalComponent {
  isVisible: boolean = false;
  filteredLocationList: Story[] = [];
  stories: Story[] = []
  constructor(private searchStoryService: SearchStoryService, private router: Router, private apiService: ApiService,   private photoService: ProfilePhotoService) {
    this.loadData()
  }



  // loadData() {
  //   this.apiService.getStories().subscribe({
  //     next: (stories) => {
  //       this.stories = stories

  //       this.filteredLocationList = this.stories

  //       console.log('Error fetching destinations:', this.filteredLocationList);

  //     },
  //     error: (error) => {

  //       console.error('Error fetching destinations:', error);


  //     }
  //   })
  // }
  loadData() {
    // Първо, извличате картата на изображенията
    this.photoService.fetchImagesMap().then(imagesMap => {
      // След това извличате историите
      this.apiService.getStories().subscribe({
        next: (stories) => {
          // Прилагате изображенията към авторите на историите
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
  
  showModal(): void {
    this.isVisible = true;

  }

  closeModal(): void {
    this.isVisible = false;
    console.log('show');

  }

  filterResults(text: string): void {
    const trimmedText = text.trim();
  this.filteredLocationList = [...this.stories]; 

    if (!trimmedText) {
      this.filteredLocationList = this.stories;
    } else {
      this.filteredLocationList = this.stories.filter(
        story => story?.title.toLowerCase().includes(trimmedText.toLowerCase())
      );
      //  console.log('destinations:',  this.filteredLocationList);

    }

    this.searchStoryService.setSearchResults(this.filteredLocationList);

this.closeModal()
    this.router.navigate(['/search-blog'])

  }
}



