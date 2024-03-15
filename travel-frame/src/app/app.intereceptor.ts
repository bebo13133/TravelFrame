import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, catchError, tap } from "rxjs";
import { environment } from "../environments/environment.development";
import { Router } from "@angular/router";
import { ErrorService } from "./core/error/error.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private router: Router, private errorService: ErrorService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
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


        return next.handle(req)
        // .pipe(
        //     catchError((error) => {
        //         if (error.status === 401 || error.status ===404) {
        //             this.router.navigate(['/home']);

        //         } else {
        //             this.errorService.setError(error)

        //             this.router.navigate(['/error']);

        //         }
        //         return [error]

        //     })
        // )
    }

}
export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS,
}

