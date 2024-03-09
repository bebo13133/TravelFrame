import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

register();


@Component({
  selector: 'app-slider-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-catalog.component.html',
  styleUrls: ['./slider-catalog.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderCatalogComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
    new Swiper('.swiper', {
      // direction: 'horizontal', // Добавете тази линия

      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      keyboard: {
        enabled: true,
      },
      mousewheel: {
        thresholdDelta: 70,
      },
      spaceBetween: 60,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}
