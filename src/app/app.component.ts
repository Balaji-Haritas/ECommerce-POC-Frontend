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
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[ProductService,CategoryService,HttpClient,AccountService]
})
export class AppComponent  {

}
