import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "../services/account.service";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{

    constructor(private accService:AccountService, private route:Router){}

    canActivate():boolean {
        if(this.accService.isLoggedIn()){
            return true;
        }else{
            this.route.navigate(['login']);
            return false;
        }
    }
}