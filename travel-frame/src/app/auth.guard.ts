import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './User/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private userService: UserService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (this.userService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
