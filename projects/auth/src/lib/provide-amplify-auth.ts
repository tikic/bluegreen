import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { Amplify, type ResourcesConfig } from 'aws-amplify';
import type { AmplifyV6Config } from './auth.types';
import { AUTH_CONFIG } from './auth.tokens';
import { AuthInterceptor } from './auth.interceptor';

export function provideAmplifyAuth(config: AmplifyV6Config) {
  return makeEnvironmentProviders([
    { provide: AUTH_CONFIG, useValue: config },
    provideAppInitializer(() => {
      if (typeof window === 'undefined') return;
      Amplify.configure(config as unknown as ResourcesConfig);
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]);
}

export const provideAuth = provideAmplifyAuth;
