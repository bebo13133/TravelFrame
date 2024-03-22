import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddNewLinePipe } from '../../shared/pipes/add-new-line.pipe';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Story } from '../../types/story.models';

@Component({
  selector: 'app-story-details',
  standalone: true,
  imports: [CommonModule,AddNewLinePipe,RouterLink],
  templateUrl: './story-details.component.html',
  styleUrl: './story-details.component.css'
})
export class StoryDetailsComponent implements OnInit {

constructor(private apiService: ApiService, private route: ActivatedRoute){}
  story: Story | null = null;
  ngOnInit(): void {
    this.loadStoryDetails()
  }
  loadStoryDetails(): void {

    const id = this.route.snapshot.paramMap.get('storyId');
    if(id){
      this.apiService.getStoryById(id).subscribe({
        next: (story: Story) => {
        this.story = story
        // console.log("dsaddsads",this.story)
        },
        error: (error) => {
          console.error('Error fetching destination details:', error);
        
        }
      })
    }
  }
}
