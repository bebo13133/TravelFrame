import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, catchError, finalize, tap } from "rxjs";
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
        catchError((error) => {
          // Задаване на грешка винаги, когато има такава
          this.errorService.setError(error);

          // Пренасочване в зависимост от статуса на грешката
          if (error.status === 401 || error.status === 404) {
            // За грешки 401 и 404 пренасочване към началната страница
            this.router.navigate(['/home']);
          } else if (error.status === 403) {
            // За грешка 403 пренасочване към страницата за грешка, която може да бъде специфична за тази грешка
            // Ако имате специална страница за 403, променете маршрута по-долу
            this.router.navigate(['/error']);
          } else {
            // За всички останали грешки също пренасочване към страницата за грешка
            this.router.navigate(['/error']);
          }
          // Връщане на грешката като Observable, за да може потокът да продължи

          return [error];
        }),
        finalize(() => {
          // Скриване на спинъра след завършване на заявката или при грешка
          this.spinnerService.requestEnded();
        })
      )
  }

}
export const appInterceptorProvider: Provider = {
  multi: true,
  useClass: AppInterceptor,
  provide: HTTP_INTERCEPTORS,
}

