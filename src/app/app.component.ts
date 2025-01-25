import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[ProductService,CategoryService]
})
export class AppComponent {
  title = 'E-Commerce-POC';
  showProductForm: boolean = false;
 
  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
  }  
}
