// tilt.directive.ts
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const deltaX = (x - rect.width / 2) / rect.width;
    const deltaY = (y - rect.height / 2) / rect.height;
  
    const rotationY = deltaX * 50; // Adjust the "20" for more or less tilt
    const rotationX = deltaY * -50; // Adjust the "-20" for more or less tilt
    const scale = 1.10; // Мащабиране с 5% за да изглежда, че елементът изпъква
  
    this.renderer.setStyle(this.el.nativeElement, 'transform', `rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${scale})`);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.9s');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
