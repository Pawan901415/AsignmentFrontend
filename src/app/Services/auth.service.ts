import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Injectable({
  providedIn: 'root'
})
export default class AuthService {




private baseUrl:string="http://localhost:52023/api/User/";
private userPayload:any;
constructor(private http:HttpClient,private router:Router) { 
  this.userPayload=this.decodeToken();
}

signup(userObj:any){

return this.http.post<any>(`${this.baseUrl}register`,userObj)
}


signOut(){

  localStorage.clear();
  this.router.navigate(['login']);

}


decodeToken(){
const jwtHelper=new JwtHelperService();
const token=this.getToken()!;
 return jwtHelper.decodeToken(token)
}


login(loginObj:any){
  return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
}

storeToken(tokenvalue:string){

  localStorage.setItem('token',tokenvalue)
}

getToken(){
  return localStorage.getItem('token');
}

isLoggedIn():boolean{
  return !!localStorage.getItem('token');
}
getFullNameFromToken(){
  if(this.userPayload)
  return this.userPayload.name;
}

getRoleFromToken(){
  if(this.userPayload)
  return this.userPayload.role;
}

}
