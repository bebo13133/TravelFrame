import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(email:string, password:string){
    const {apiUrl}= environment
    return this.http.post<User>(`${apiUrl}/users/login`,{email,password})
  }

  register(name: string, email: string, password: string){
    const {apiUrl}= environment

    return this.http.post<User>(`${apiUrl}/users/register`,{name,email,password}) 
  }

}
