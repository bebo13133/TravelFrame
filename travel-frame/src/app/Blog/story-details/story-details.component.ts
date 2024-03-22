import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddNewLinePipe } from '../../shared/pipes/add-new-line.pipe';

@Component({
  selector: 'app-story-details',
  standalone: true,
  imports: [CommonModule,AddNewLinePipe],
  templateUrl: './story-details.component.html',
  styleUrl: './story-details.component.css'
})
export class StoryDetailsComponent {

}
