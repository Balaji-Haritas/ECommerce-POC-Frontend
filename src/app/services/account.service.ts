import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { map, Observable } from "rxjs";
import { User } from "../models/user.models";

@Injectable({
    providedIn:'root'
})

export class AccountService{

    constructor(private http:HttpClient){}
    currentUser = signal<User | null>(null);

    login(model:any):Observable<any>{
        return this.http.post<User>(``,model).pipe(
            map(user =>{
               if(user){
                localStorage.setItem('user',JSON.stringify(user));
                this.currentUser.set(user);
               } 
            })
        );
    }

    logout(){
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }

}