import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    constructor(private accService:AccountService, private route:Router){}
    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.accService.getToken();

        if(token){
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('Token added to request:', token);
        }
        return handler.handle(req).pipe(
            catchError((error:HttpErrorResponse)=>{
                if(error.status === 401){
                    this.route.navigate(['login'])
                }
                console.error('Request error:', error);
                return throwError(error);
            })
        );
    }
} 