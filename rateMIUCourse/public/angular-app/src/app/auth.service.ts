import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtService:JwtHelperService) { }

  #isLoggedIn:boolean=false;

  get username(){ 
    let username = "Unknown";
    if(this.token){
      username = this.jwtService.decodeToken(this.token).username;
    }
    return username; 
  }
  set token(token:string){ 
    localStorage.setItem("token_storage_key", token);
  }
  get token(){ 
    return localStorage.getItem("token_storage_key") as string;
   }
   set isLoggedIn(isLoggedIn:boolean){ 
     this.#isLoggedIn = isLoggedIn; 
   }
   get isLoggedIn(){ 
     return this.#isLoggedIn; 
   }

   clearToken(){
    localStorage.clear();
    this.isLoggedIn = false;
  }

  geTokenHeader (){
    let head = new HttpHeaders({
      'Content-Type': `application/json`
    }).set('Authorization',  `Bearer ${this.token}`)
    return {
        headers: head
    }
  }
}
