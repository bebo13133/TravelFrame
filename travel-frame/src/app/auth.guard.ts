

import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const AuthGuard: CanActivateFn = (route,state) => {
const router = inject(Router)
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken != null) {
  return true

  }else {
    router.navigateByUrl('/auth');
    return false;
  }
}