import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AccountService } from './services/account.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, CommonModule,RouterModule],
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[ProductService,CategoryService,HttpClient,AccountService]
})
export class AppComponent implements OnInit {

  constructor(private accService:AccountService, private http:HttpClient){}
  users:any;

  ngOnInit():void{
    this.getUsers();
  }

  setCurrentUser(){
    const userSting = localStorage.getItem('user');
    if(!userSting) return;
    const user = JSON.parse(userSting);
    this.accService.currentUser.set(user)
  }

  getUsers(){
    this.http.get('').subscribe({
      next:response => this.users = response,
      error:err => console.log(err),
      complete: () => console.log("Request has Completed")
    })
  }

}
