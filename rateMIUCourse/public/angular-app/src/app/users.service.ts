import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './login/login.component';
import { UserCredential } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  register(credential:UserCredential) : Observable<string>{
    return this.http.post<string>("http://localhost:3000/api/users", credential);
  }
  
  login(credential:UserCredential) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>("http://localhost:3000/api/login", credential);
  } 
}
