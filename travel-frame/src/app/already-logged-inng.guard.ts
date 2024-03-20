
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";


export const AlreadyLoggedInngGuard: CanActivateFn = (route,state) => {
  const router = inject(Router)
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken != null) {
      router.navigateByUrl('home');
    return false
  
    }else {
     
      return true;
    }
  }