import { Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = Inject(TokenService);
  const router = Inject(Router);
  const token = tokenService.getToken('accessToken');
  if (token) {
    return true;
  } else {
    if (state.url !== '/auth/login') {
      tokenService.clearToken('accessToken');
      router.navigate(['/auth/login']);
    }
    return false;
  }
};
