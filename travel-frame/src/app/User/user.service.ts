import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ email: string, username: string, _id: string, accessToken: string }>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('accessToken', res.accessToken);

          localStorage.setItem('email', res.email);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res._id);
          this.user$$.next({
            email: res.email,
            name: res.username,
            _id: res._id,
            accessToken: res.accessToken
          });


        })
      );

  }
  register(name: string, email: string, password: string) {
    const { apiUrl } = environment

    return this.http.post<{ email: string, username: string, _id: string, accessToken: string }>(`${apiUrl}/users/register`, { name, email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('accessToken', res.accessToken);

          localStorage.setItem('email', res.email);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res._id);
          this.user$$.next({
            email: res.email,
            name: res.username,
            _id: res._id,
            accessToken: res.accessToken
          });


        })
      );
  }


  logout() {
    return this.http.post<User>(`${environment.apiUrl}/users/logout`, {})
      .pipe(
        tap(res => {
          localStorage.clear()
          this.user$$.next(undefined);
        })
      );
  }

}
