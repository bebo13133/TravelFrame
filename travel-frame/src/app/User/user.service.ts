import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy , OnInit {
  // isLoggedIn: boolean = false;
  private user$$ = new BehaviorSubject<User | undefined>(undefined);

  public user$ = this.user$$.asObservable();
  
  user: User | undefined
  private subscription: Subscription = new Subscription();
  get isLoggedIn(): boolean {
    // console.log ("тест тест")
    return !!this.user$$.getValue();
  }
// subscription: Subscription;
  constructor(private http: HttpClient) {
    
    this.loadUserFromLocalStorage();
    this.subscription = this.user$.subscribe(user => {
      this.user = user;
    })
    // this.subscription = this.user$.subscribe(user => {
    //   this.isLoggedIn = !!user;
    //   console.log(this.isLoggedIn)
    // });
   }

   ngOnInit() {
    // this.subscription = this.user$.subscribe(user => {
    //   this.isLoggedIn = !!user;
    // });
  }


   private loadUserFromLocalStorage(): void {
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    const _id = localStorage.getItem('userId');

    if (accessToken && email && username && _id) {
  
      this.user$$.next({ email, name:username, _id, accessToken });
    
    }else{
      this.user$$.next(undefined);
    }
  }
  
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
  register(username: string, email: string, password: string) {
    const { apiUrl } = environment

    return this.http.post<{ email: string, username: string, _id: string, accessToken: string }>(`${apiUrl}/users/register`, { username, email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('accessToken', res.accessToken);

          localStorage.setItem('email', res.email);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res._id);
          this.user$$.next({
            email: res.email,
            name: res.username,
            username: res.username,
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
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
