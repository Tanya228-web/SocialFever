import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  return userService.isLogin$.pipe(
    take(1),
    map((islogin: boolean) => {
      if (!islogin) {
        return false;
      } else {
        return true;
      }
    })
  );
};
