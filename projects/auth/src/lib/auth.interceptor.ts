import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fetchAuthSession } from 'aws-amplify/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(fetchAuthSession()).pipe(
      switchMap(({ tokens }) => {
        const access = tokens?.accessToken ? String(tokens.accessToken) : null;
        if (!access) return next.handle(req);
        const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${access}` } });
        return next.handle(authReq);
      }),
    );
  }
}
