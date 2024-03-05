import { Component } from '@angular/core';
import { DescriptionComponent } from './description/description.component';
import { LastThreeComponent } from './last-three/last-three.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DescriptionComponent,LastThreeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
