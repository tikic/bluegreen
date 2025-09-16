import { Amplify, type ResourcesConfig } from 'aws-amplify';
import type { AmplifyV6Config } from './auth.types';

export function configureAmplifyAuth(cfg: AmplifyV6Config): void {
  if (typeof window === 'undefined') return;
  Amplify.configure(cfg as unknown as ResourcesConfig);
}
