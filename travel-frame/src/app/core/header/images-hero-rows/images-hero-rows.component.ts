import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

@Component({
  selector: 'app-images-hero-rows',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './images-hero-rows.component.html',
  styleUrl: './images-hero-rows.component.css',
})
export class ImagesHeroRowsComponent {

}
