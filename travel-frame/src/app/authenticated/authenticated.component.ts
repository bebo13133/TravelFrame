import { Component, OnInit } from '@angular/core';
import { UserService } from '../User/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.css'
})
export class AuthenticatedComponent implements OnInit {
isLoggedIn = false;

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn;
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth'])
    }
  }
}
