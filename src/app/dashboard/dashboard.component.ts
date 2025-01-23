import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule,RouterModule,MatIconModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  products: Product[] = [];

  categories: any[] = [];

  allProducts: Product[] = [];

  constructor(private categoryService: CategoryService, private router: Router,private productService:ProductService) { }

  ngOnInit(): void {
    this.loadCategories();

    this.loadAllProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        this.categories.unshift({ categoryId: 0, categoryName: 'View All'});
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  setCategoryId(categoryId: number): void {
    if (categoryId === 0) {
      this.products = this.allProducts; // Show all products
    } else {
      this.loadProducts(categoryId);
    }
  }


  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.allProducts = data;
        this.products = this.allProducts; 
      },
      error => {
        console.error('Error fetching all products', error);
      }
    );
  }
  loadProducts(categoryId: number): void {
    this.categoryService.getProductsByCategory(categoryId).subscribe(
      data => {
        this.products = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

}
