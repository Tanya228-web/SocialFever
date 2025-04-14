import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isLogin$.pipe(
    take(1),
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};
