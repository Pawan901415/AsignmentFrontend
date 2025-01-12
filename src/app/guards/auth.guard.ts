import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree,Router } from "@angular/router";
import { Observable } from "rxjs";
import AuthService from "../Services/auth.service";


@Injectable({
    providedIn:'root'
})
export class AuthGuard{
    constructor(private auth:AuthService,private router:Router){}
      canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
        ):Observable<boolean |UrlTree>|Promise<boolean |UrlTree>|boolean |UrlTree{
            if(this.auth.isLoggedIn()){
                return true;
            }
            else{
this.router.navigate(['login'])
                return false;
            }
        }

}
