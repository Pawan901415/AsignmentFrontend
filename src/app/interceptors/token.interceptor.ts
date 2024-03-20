import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import AuthService from "../Services/auth.service";
@Injectable()

export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth:AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
const myToken=this.auth.getToken();
if(myToken){

  req=req.clone({
    setHeaders:{Authorization:`Bearer ${myToken}`}
  })
}




    return next.handle(req);
  }

}
