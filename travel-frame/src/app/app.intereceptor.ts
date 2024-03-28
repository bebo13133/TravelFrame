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
        
          this.errorService.setError(error);

     
          if (error.status === 401 || error.status === 404) {
       
            this.router.navigate(['/home']);
          } else if (error.status === 403) {
           
            this.router.navigate(['/error']);
          } else {
        
            this.router.navigate(['/error']);
          }
       

          return [error];
        }),
        finalize(() => {
      
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

