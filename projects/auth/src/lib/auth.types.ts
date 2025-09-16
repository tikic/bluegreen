// File: projects/auth/src/lib/auth.types.ts
// Strict v6 config (no `any`, no index signatures)

export interface AmplifyOAuthConfig {
  domain: string;
  redirectSignIn: ReadonlyArray<string>;
  redirectSignOut: ReadonlyArray<string>;
  responseType: 'code' | 'token';
  scopes: ReadonlyArray<string>;
}

export interface AmplifyLoginWith {
  email?: boolean;
  oauth?: AmplifyOAuthConfig;
}

export interface CognitoUserAttribute {
  required?: boolean;
  mutable?: boolean;
}

export interface CognitoPasswordFormat {
  minLength?: number;
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireNumbers?: number | boolean;
  requireSpecialCharacters?: boolean;
}

export type SignUpVerificationMethod = 'code' | 'link';

export interface AmplifyCognitoConfig {
  userPoolId: string;
  userPoolClientId: string;
  identityPoolId?: string;
  loginWith?: AmplifyLoginWith;
  signUpVerificationMethod?: SignUpVerificationMethod;
  userAttributes?: Record<string, CognitoUserAttribute>;
  allowGuestAccess?: boolean;
  passwordFormat?: CognitoPasswordFormat;
}

export interface AmplifyV6Config {
  Auth: {
    Cognito: AmplifyCognitoConfig;
  };
}

export type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

export interface CognitoUserProfile {
  username: string;
  attributes?: Record<string, string | undefined>;
  idToken?: string | null;
  accessToken?: string | null;
}
