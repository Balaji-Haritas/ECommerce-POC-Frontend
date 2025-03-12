import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AccountService } from "../services/account.service";

@Injectable({
    providedIn:'root'
})

export class AuthGuard {

    constructor(private accService:AccountService, private route:Router){}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data['role'];
        const user = this.accService.getUserFromToken();
        if (this.accService.isLoggedIn() && (!expectedRole || user.role === expectedRole)) {
          return true;
        } else {
          this.route.navigate(['login']); 
          return false;
        }  
    }
}