import { Component } from '@angular/core';
import { ImagesHeroRowsComponent } from '../../core/header/images-hero-rows/images-hero-rows.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ImagesHeroRowsComponent, RouterLink, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
