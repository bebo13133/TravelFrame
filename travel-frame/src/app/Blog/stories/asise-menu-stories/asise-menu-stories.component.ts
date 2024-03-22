import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-asise-menu-stories',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './asise-menu-stories.component.html',
  styleUrl: './asise-menu-stories.component.css'
})
export class AsiseMenuStoriesComponent {

}
