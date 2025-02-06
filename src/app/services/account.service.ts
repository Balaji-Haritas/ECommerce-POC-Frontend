import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})

export class AccountService{
    private token:string | null =null;
    private userRole:string | null =null;
    constructor(private http:HttpClient, private route:Router){}

    login(credentials:any){
        return this.http.post(``,credentials).subscribe(
            (response:any) => {
                this.token = response.token;
                this.userRole = response.role;
                if(this.token){
                    localStorage.setItem('token',this.token);
                }
                if(this.userRole){
                    localStorage.setItem('role',this.userRole);
                }if(this.userRole === 'admin'){
                    this.route.navigate(['admin']);
                }else{
                    this.route.navigate(['products']);
                }
            }
        );
    }

    getToken(){
        return this.token || localStorage.getItem('token') || '';
    }

    getUserRole():string | null{
        return this.userRole || localStorage.getItem('role') || '';
    }

    isLoggedIn(){
        return !!this.getToken();
    }

    logout(){
        this.token = null;
        this.userRole = null;
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.route.navigate(['login']);
    }

}