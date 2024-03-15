import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { ApiService } from '../../services/api.service';
import { Destination } from '../../types/destination';

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
  destinations: Destination[] = []

  constructor(private apiService:ApiService) { }
  getBackgroundStyle(image: File | string | null): string {
    let imageUrl = '';
    if (image instanceof File) {
   
      imageUrl = URL.createObjectURL(image);
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
  


      this.apiService.getDestinations().subscribe(destinations => {
        console.log(destinations)
        this.destinations = destinations;
      })

  


  }

}
