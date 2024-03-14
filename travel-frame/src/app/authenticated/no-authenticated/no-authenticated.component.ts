import { Component } from '@angular/core';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-authenticated',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-authenticated.component.html',
  styleUrl: './no-authenticated.component.css'
})
export class NoAuthenticatedComponent {
  isLoggedIn = false;

  constructor(private userService: UserService, private router:Router){}
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      console.log("dsadsasd",this.isLoggedIn);
      // Допълнителна логика въз основа на статуса
    });

    this.isLoggedIn = this.userService.isLoggedIn;
    if(this.isLoggedIn) {
      this.router.navigate(['/'])
    }
  }
}
