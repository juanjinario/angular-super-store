import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import {
  catchError,
  delay,
  Observable,
  retryWhen,
  take,
  tap,
  throwError,
} from "rxjs";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("interceptor 2", request.method);
    return next.handle(request).pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(1500),
          tap((err) => console.warn("Reintentando...")),
          take(3),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401) {
              // Redirigir a la página de inicio de sesión
            } else if (error.status === 500) {
              // Mostrar un mensaje de error
            } else {
              // Manejar otros errores
            }
            return throwError(error);
          })
        )
      )
    );
  }
}
