import { Component } from '@angular/core';
import { ImagesHeroRowsComponent } from '../../core/header/images-hero-rows/images-hero-rows.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ImagesHeroRowsComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
