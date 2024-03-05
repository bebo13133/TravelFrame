import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImagesHeroRowsComponent } from './images-hero-rows/images-hero-rows.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,ImagesHeroRowsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
