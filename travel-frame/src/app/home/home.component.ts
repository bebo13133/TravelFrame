import { Component } from '@angular/core';
import { DescriptionComponent } from './description/description.component';
import { LastThreeComponent } from './last-three/last-three.component';
import { HeroComponent } from './hero/hero.component';
import { InfoHomeComponent } from './info-home/info-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DescriptionComponent,LastThreeComponent,HeroComponent,InfoHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
