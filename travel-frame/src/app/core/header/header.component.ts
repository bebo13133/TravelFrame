import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ImagesHeroRowsComponent } from './images-hero-rows/images-hero-rows.component';
import { Route, Router, RouterLink } from '@angular/router';
import { UserService } from '../../User/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,ImagesHeroRowsComponent,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  scrolledDown = false;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrolledDown = window.scrollY > 250; // Проверява дали потребителят е скролнал страницата надолу повече от 50px
  }
  logout(){
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth']);

      },
      error: () => {
        this.router.navigate(['/auth']);

      },
    });
    
  }
}
