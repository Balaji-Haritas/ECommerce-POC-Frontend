import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AccountService } from "../services/account.service";

@Injectable({
    providedIn:'root'
})

export class AdminGuard implements CanActivate{

    constructor(private accService:AccountService, private route:Router){}

    canActivate(): boolean {
        const user = this.accService.getUserFromToken();
        if (user && user.role === 'Admin') {
          return true;
        } else {
          this.route.navigate(['login']); 
          return false;
        }
    }
}