import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import {
  fetchAuthSession,
  getCurrentUser,
  signInWithRedirect as amplifySignInWithRedirect,
  signOut as amplifySignOut,
} from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import type { AuthStatus, CognitoUserProfile } from './auth.types';
import { AUTH_CONFIG } from './auth.tokens';
import type { AmplifyV6Config } from './auth.types';

const LOGIN_FLAG_KEY = 'amplify:login_in_progress';

@Injectable({ providedIn: 'root' })
export class AmplifyAuthService {
  private readonly cfg = inject(AUTH_CONFIG, { optional: true }) as AmplifyV6Config | null;

  private readonly status$ = new BehaviorSubject<AuthStatus>('unknown');
  private readonly user$ = new BehaviorSubject<CognitoUserProfile | null>(null);

  private get loginInProgress(): boolean {
    return typeof window !== 'undefined' && sessionStorage.getItem(LOGIN_FLAG_KEY) === '1';
  }
  private set loginInProgress(v: boolean) {
    if (typeof window === 'undefined') return;
    if (v) sessionStorage.setItem(LOGIN_FLAG_KEY, '1');
    else sessionStorage.removeItem(LOGIN_FLAG_KEY);
  }

  statusChanges(): Observable<AuthStatus> {
    return this.status$.asObservable();
  }
  userChanges(): Observable<CognitoUserProfile | null> {
    return this.user$.asObservable();
  }

  async ensureSignedIn(): Promise<void> {
    if (typeof window === 'undefined') return; // SSR safe
    try {
      const { tokens } = await fetchAuthSession();
      if (tokens?.accessToken) {
        this.status$.next('authenticated');
        return;
      }
    } catch {}
    if (!this.loginInProgress) {
      this.loginInProgress = true;
      try {
        await amplifySignInWithRedirect();
      } finally {
        this.loginInProgress = false;
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      await amplifySignOut();
      this.status$.next('unauthenticated');
      this.user$.next(null);
    } catch {}
  }

  profile(): Observable<CognitoUserProfile | null> {
    return from(getCurrentUser()).pipe(
      switchMap(async (user) => {
        const { tokens } = await fetchAuthSession();
        const profile: CognitoUserProfile = {
          username: (user as any)?.username ?? (user as any)?.userId ?? 'unknown',
          attributes: undefined,
          idToken: (tokens as any)?.idToken ? String((tokens as any).idToken) : null,
          accessToken: (tokens as any)?.accessToken ? String((tokens as any).accessToken) : null,
        };
        return profile;
      }),
      tap((p) => {
        this.user$.next(p);
        this.status$.next('authenticated');
      }),
      catchError(() => {
        this.user$.next(null);
        this.status$.next('unauthenticated');
        return of(null);
      }),
    );
  }
}
