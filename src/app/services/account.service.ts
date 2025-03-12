import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Token } from "../models/product.model";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.models";
import { JwtHelperService } from '@auth0/angular-jwt'



@Injectable({
    providedIn:'root',
})

export class AccountService{
    private token:string | null =null;
    private jwtHelper = new JwtHelperService();
    private roleSubject = new BehaviorSubject<string>('');
    role$ = this.roleSubject.asObservable();
    constructor(private http:HttpClient, private route:Router){}

    login(credentials: any) {
        return this.http.post<Token>(`https://localhost:7131/api/Account/login`, credentials);
    }

    register(user: User):Observable<any> {
        return this.http.post(`https://localhost:7131/api/Account/register`, user);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getRoles(): Observable<any> {
        return this.http.get(`https://localhost:7131/api/Role`); 
    }

    getRoleFromToken(): string {
        const token = localStorage.getItem('token');
        if (!token) {
          return '';
        }
    
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role || '';
        this.roleSubject.next(role);
        return role;
    }

    isLoggedIn():boolean{
        const token = this.getToken();
        return token != null && !this.jwtHelper.isTokenExpired(token);
    }

    getUserFromToken() {
        const token = this.getToken();
        return token ? this.jwtHelper.decodeToken(token) : null;
    }

    logout(){
        localStorage.removeItem('token');
        this.token = null;
        this.roleSubject.next('');
        localStorage.clear();
        this.route.navigate(['login']);
    }

}

