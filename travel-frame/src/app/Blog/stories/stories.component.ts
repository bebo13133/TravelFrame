import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CreateStoriesComponent } from '../create-stories/create-stories.component';

@Component({
  selector: 'app-create-stories',
  standalone: true,
  imports: [RouterLink, RouterModule,CreateStoriesComponent],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent {

}
