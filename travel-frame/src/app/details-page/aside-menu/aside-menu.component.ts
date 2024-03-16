import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css'
})
export class AsideMenuComponent {
  @Input() isOwner: boolean = false;
  @Input() destinationId: string | null = null; 
}
