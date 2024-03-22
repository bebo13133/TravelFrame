import { CommonModule, SlicePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { Swiper, SwiperOptions } from 'swiper/types';
import { ApiService } from '../../services/api.service';
import { Story } from '../../types/story.models';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css'],
  standalone: true,
  imports:[CommonModule,SlicePipe]
})
export class HomeCarouselComponent implements AfterViewInit, OnInit {
  stories: Story[] = [];
  @ViewChild('slideRow') slideRow!: ElementRef<HTMLDivElement>;
  @ViewChild('mainElement') mainElement!: ElementRef<HTMLElement>;
  currentIndex: number = 0;
  btns = [0, 1, 2, 3]; 

  constructor(private apiService:ApiService) {}
ngOnInit(): void {
  this.loadStories()
}
  ngAfterViewInit(): void {
    this.updateSlide();
  }

  setActiveBtn(index: number): void {
    this.currentIndex = index;
    this.updateSlide();
  }

  updateSlide(): void {
    const mainWidth = this.mainElement.nativeElement.offsetWidth;
    const translateValue = this.currentIndex * -mainWidth;
    this.slideRow.nativeElement.style.transform = `translateX(${translateValue}px)`;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateSlide();
  }

  loadStories(): void {
    this.apiService.getStories().subscribe({
      next: (stories) => {
        this.stories = stories;
        this.btns = Array(Math.min(this.stories.length, 4)).fill(0).map((x, i) => i);
        // Може да инициализирате Swiper тук, ако е необходимо да се реинициализира след зареждане на данните
        console.log("story",this.stories)
      },
      error: (err) => console.error('Failed to load stories', err),
    });
  }





}

