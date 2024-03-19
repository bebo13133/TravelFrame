import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input  } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { ApiService } from '../../services/api.service';
import { Destination } from '../../types/destination';
import { RouterLink, RouterModule } from '@angular/router';

register();


@Component({
  selector: 'app-slider-catalog',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink],
  templateUrl: './slider-catalog.component.html',
  styleUrls: ['./slider-catalog.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderCatalogComponent implements OnInit {
  @Input() destinations: Destination[] = [];

  constructor(private apiService:ApiService) { }
  getBackgroundStyle(image: File | string | null): string {
    let imageUrl = '';
    if (image instanceof File) {
   
      imageUrl = URL.createObjectURL(image); //ako от тип file -  преобразувам я в низ , за да мога да я задам като background
    } else if (typeof image === 'string') {
 
      imageUrl = image;
    }
  
  
    const backgroundStyle = `linear-gradient(to top, #0f2027, #203a4300, #2c536400), url(${imageUrl}) no-repeat 50% 50% / cover`;
    return backgroundStyle;
  }
  ngOnInit(): void {
    new Swiper('.swiper', {
    
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
