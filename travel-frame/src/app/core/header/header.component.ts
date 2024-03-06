import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImagesHeroRowsComponent } from './images-hero-rows/images-hero-rows.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,ImagesHeroRowsComponent,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
