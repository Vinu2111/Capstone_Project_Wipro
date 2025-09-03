import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // check localStorage for token
  const token = localStorage.getItem('jwtToken');

  if (token) {
    return true; // allow route
  } else {
    router.navigate(['/login']); // redirect to login
    return false;
  }
};
