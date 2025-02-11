import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Token } from "../models/product.model";

@Injectable({
    providedIn:'root',
})

export class AccountService{
    private token:string | null =null;
    //private userRole:string | null =null;
    constructor(private http:HttpClient, private route:Router){}

    login(credentials: any) {
        return this.http.post<Token>(`https://localhost:7131/api/Account/login`, credentials);
    }

    register(user: any) {
        return this.http.post(`https://localhost:7131/api/Account/register`, user);
    }



    getToken(): boolean {
        const token = localStorage.getItem('token');
        return token !== null && token !== '';
    }

    // getUserRole():string | null{
    //     return this.userRole || localStorage.getItem('role') || '';
    // }

    isLoggedIn(){
        return !!this.getToken();
    }

    logout(){
        // this.userRole = null;
        // localStorage.removeItem('role');
        this.token = null;
        localStorage.clear();
        this.route.navigate(['login']);
    }

}