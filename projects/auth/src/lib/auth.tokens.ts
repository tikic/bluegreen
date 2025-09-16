import { InjectionToken } from '@angular/core';
import type { AmplifyV6Config } from './auth.types';

export const AUTH_CONFIG = new InjectionToken<AmplifyV6Config>('AUTH_CONFIG');
