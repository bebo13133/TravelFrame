import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  // login(email:string, password:string){
  //   const {apiUrl}= environment
  //   return this.http.post<User>(`${apiUrl}/users/login`,{email,password})
  // }
  login(email: string, password: string) {
    return this.http.post<{email: string, username: string, _id: string, accessToken: string}>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('accessToken', res.accessToken); 
    
          localStorage.setItem('email', res.email);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res._id);
    
        })
      );
  }
  register(name: string, email: string, password: string){
    const {apiUrl}= environment

    return this.http.post<{email: string, username: string, _id: string, accessToken: string}>(`${apiUrl}/users/register`,{name,email,password})
    .pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken); 
  
        localStorage.setItem('email', res.email);
        localStorage.setItem('username', res.username);
        localStorage.setItem('userId', res._id);
  
      })
    );
  }

}
