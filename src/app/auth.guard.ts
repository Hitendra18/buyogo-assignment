import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from './models/user';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  let user: User | null = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || '') as User;
  } catch (error) {
    localStorage.clear();
    router.navigate(['/login']);
  }

  if (user) return true;

  router.navigate(['/login']);
  return false;
};
