import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './User/user.service';

@Injectable({
  providedIn: 'root'
})
export class DeActiveGuards {
  constructor(private userService: UserService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (!this.userService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
