import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../environments/access-key";

@Injectable({
  providedIn: 'root' 
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const accessToken = localStorage.getItem('userId');
 
    if (accessToken === environment.KEY) {
    
      return true;
    } else {
      
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
