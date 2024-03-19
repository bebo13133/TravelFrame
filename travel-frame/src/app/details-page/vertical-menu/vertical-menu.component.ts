import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vertical-menu',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './vertical-menu.component.html',
  styleUrl: './vertical-menu.component.css'
})
export class VerticalMenuComponent  {
  @Input() destinationId: string | null = null;
  @Input() title: string | null = null;


}
