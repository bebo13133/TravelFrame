import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class HomeCarouselComponent implements AfterViewInit {
  @ViewChild('slideRow') slideRow!: ElementRef<HTMLDivElement>;
  @ViewChild('mainElement') mainElement!: ElementRef<HTMLElement>;
  currentIndex: number = 0;
  btns = [0, 1, 2, 3]; 

  constructor() {}

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
}
