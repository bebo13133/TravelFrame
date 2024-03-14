import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PriceSideComponent } from './price-side/price-side.component';
import { AuthenticatedComponent } from '../authenticated/authenticated.component';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule,PriceSideComponent,AuthenticatedComponent,AsideMenuComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {
  backgroundImageUrl: string = '';
constructor(){}

  ngOnInit() {
    this.loadBackgroundImage();
  }

  loadBackgroundImage() {
    // Предполагаме, че получавате URL-а на изображението от някаква заявка
    this.backgroundImageUrl = '/assets/media/desert.webp'; // като почна със заявките пътя ще го заместя динамично да я получава
  }
}
