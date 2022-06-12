import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { concatMap, delay, mergeMap, retryWhen, tap } from 'rxjs/operators';

export const retryCount = 3;
export const retryWaitMilliSeconds = 1000;

@Injectable()
export class DirectusInterceptor implements HttpInterceptor {
  retryDelay = 2000;
  retryMaxAttempts = 2;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(this.retryAfterDelay());
  }

  retryAfterDelay(): any {
    return retryWhen((errors) => {
      return errors.pipe(
        mergeMap((err, count) => {
          // throw error when we've retried ${retryMaxAttempts} number of times and still get an error
          if (count === this.retryMaxAttempts) {
            return throwError(err);
          }
          return of(err).pipe(
            tap((error) =>
              console.log(`Retrying ${error.url}. Retry count ${count + 1}`)
            ),
            mergeMap(() => timer(this.retryDelay))
          );
        })
      );
    });
  }
}
