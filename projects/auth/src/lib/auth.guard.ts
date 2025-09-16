import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanMatch,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { signInWithRedirect, fetchAuthSession } from 'aws-amplify/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanMatch {
  async canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> {
    return this.ensureAuth(state.url);
  }

  async canActivateChild(): Promise<boolean | UrlTree> {
    return this.ensureAuth();
  }

  async canMatch(_route: Route, _segments: UrlSegment[]): Promise<boolean | UrlTree> {
    return this.ensureAuth();
  }

  private async ensureAuth(returnUrl?: string): Promise<boolean> {
    if (typeof window === 'undefined') {
      return true;
    }
    const { tokens } = await fetchAuthSession().catch(() => ({ tokens: undefined as any }));
    if (tokens?.accessToken) return true;

    try {
      if (returnUrl) sessionStorage.setItem('auth:returnUrl', returnUrl);
      await signInWithRedirect();
    } catch (_) {
    }
    return false;
  }
}
