import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request && request.method == 'DELETE') {
      request = request.clone({
        headers: request.headers.set('AuthToken', 'JKLDSFKJFH834753RHIHJSKF'),
      });
    }

    return next.handle(request);
  }
}
