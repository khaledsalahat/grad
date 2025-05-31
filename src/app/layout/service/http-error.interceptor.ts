import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";

        if (error.error instanceof ProgressEvent) {
          errorMessage = `Connection error: ${error.message}`;
        } else if (typeof error.error === "string") {
          errorMessage = error.error;
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = error.message;
        }

        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }

        const normalizedError = {
          message: errorMessage,
          status: error.status,
          statusText: error.statusText,
          url: error.url,
        };

        return throwError(() => normalizedError);
      })
    );
  }
}
