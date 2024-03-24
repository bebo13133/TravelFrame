import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { SearchModalComponent } from '../../searchStory/search-modal/search-modal.component';

@Component({
  selector: 'app-asise-menu-stories',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule,SearchModalComponent],
  templateUrl: './asise-menu-stories.component.html',
  styleUrl: './asise-menu-stories.component.css'
})
export class AsiseMenuStoriesComponent {

}
