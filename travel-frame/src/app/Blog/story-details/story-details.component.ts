import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddNewLinePipe } from '../../shared/pipes/add-new-line.pipe';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Story } from '../../types/story.models';
import { ProfilePhotoService } from '../../services/profile-photo.service';

@Component({
  selector: 'app-story-details',
  standalone: true,
  imports: [CommonModule,AddNewLinePipe,RouterLink],
  templateUrl: './story-details.component.html',
  styleUrl: './story-details.component.css'
})
export class StoryDetailsComponent implements OnInit {

constructor(private apiService: ApiService, private route: ActivatedRoute, private photoService:ProfilePhotoService){}
  story: Story | null = null;
  ngOnInit(): void {
    window.scrollTo({top:0})
    this.loadStoryDetails()
  }

  loadStoryDetails(): void {
    const storyId = this.route.snapshot.paramMap.get('storyId');
    if (storyId) {
      this.apiService.getStoryById(storyId).subscribe({
        next: async (story: Story) => {
          if (story._ownerId) {
            try {
              const imagesMap = await this.photoService.fetchImagesMap();
              const authorImageUrl = imagesMap[story._ownerId] || 'път_към_стандартно_изображение';
              this.story = {...story, authorImage: authorImageUrl};
            } catch (error) {
              console.error('Error fetching images map:', error);
              this.story = {...story, authorImage: 'път_към_стандартно_изображение'};
            }
          } else {
            this.story = story;
          }
        },
        error: (error) => {
          console.error('Error fetching story details:', error);
        }
      });
    }
  }
}
