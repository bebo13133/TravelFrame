import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [],
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
    this.backgroundImageUrl = '/assets/media/desert.webp'; // кат опочна със заявките пътя ще го заместя динамично да я получава
  }
}
