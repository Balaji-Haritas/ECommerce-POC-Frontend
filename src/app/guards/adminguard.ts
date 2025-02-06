import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AccountService } from "../services/account.service";

@Injectable({
    providedIn:'root'
})

export class AdminGuard implements CanActivate{

    constructor(private accService:AccountService, private route:Router){}

    canActivate():boolean{
        const userRole = this.accService.getUserRole();
        if(userRole === 'admin'){
            return true;
        }else{
            this.route.navigate(['products']);
            return false;
        }
    }
}