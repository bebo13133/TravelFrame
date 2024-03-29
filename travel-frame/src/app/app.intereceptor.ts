import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, catchError, finalize, tap, throwError } from "rxjs";
import { environment } from "../environments/environment.development";
import { Router } from "@angular/router";
import { ErrorService } from "./core/error/error.service";
import { SpinnerService } from "./spinner/spinner.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorService: ErrorService, private spinnerService:SpinnerService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (req.url.startsWith('http://localhost:3030') && accessToken) {
      req = req.clone({
        setHeaders: {
          "X-Authorization": accessToken
        }
      });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    this.spinnerService.requestStarted();
    return next.handle(req)
    .pipe(
      // catchError((error: HttpErrorResponse) => {
      //   this.errorService.setError(error);
      //   switch (error.status) {
      //     case 401:
      //     case 404:
     
      //       this.router.navigate(['/home']);
      //       break;
      //     case 403:
       
      //       this.router.navigate(['/home']);
      //       break;
      //     default:
      //       // За всички останали грешки, пренасочване към обща страница за грешка
      //       this.router.navigate(['/error']);
      //       break;
      //   }
      //   return throwError(() => error);
      // }),
      finalize(() => {
        this.spinnerService.requestEnded();
        this.errorService.clearError(); // Изчистване на грешката след завършване на заявката
      })
  )}

}
export const appInterceptorProvider: Provider = {
  multi: true,
  useClass: AppInterceptor,
  provide: HTTP_INTERCEPTORS,
}

