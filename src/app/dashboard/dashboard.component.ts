import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Category } from '../models/category.models';
import { CartserviceService } from '../services/cart.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '../notifications/notification.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

addToWishlist(_t22: Product) {
throw new Error('Method not implemented.');
}

addToCart(product: Product):void {
  this.cartService.addToCart(product);

  const updatedProduct = this.cartService.getCartItem(product.id);
  const updatedQuantity = updatedProduct ? updatedProduct.quantity : product.quantity;
  
  this.notificationService.showSuccess(`Product ${product.name} has been added to the cart! Quantity: ${updatedQuantity}`,'Close',3000,'left','top');
  this.router.navigate(['cart'])
  }

  products: Product[] = [];

  categories: Category[] = [];

  allProducts: Product[] = [];

  constructor(private categoryService: CategoryService, private router: Router,
    private productService:ProductService, private cartService:CartserviceService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.loadCategories();

    this.loadAllProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
        this.categories.push({ categoryId: 0, categoryName: 'View All' });
     },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  setCategoryId(categoryId: number): void {
    if (categoryId === 0) {
      this.products = this.allProducts; 
    } else {
      this.loadProducts(categoryId);
    }
  }

  getCategoryIcon(categoryName: string): string {
    switch (categoryName.toLowerCase()) {
      case 'electronics':
        return 'fas fa-tv'; // FontAwesome TV icon
      case 'clothes':
        return 'fas fa-tshirt'; // FontAwesome T-shirt icon
      case 'books':
        return 'fas fa-book'; // FontAwesome Book icon
      case 'sports':
        return 'fas fa-football-ball'; // FontAwesome Football icon
      case 'cosmetics':
        return 'fas fa-spa'; // FontAwesome Spa icon
      case 'home & furniture':  
        return 'fas fa-couch';
      default:
        return 'fas fa-th-large'; // Default Folder icon
    }
  }
  

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.allProducts = data;
        this.products = this.allProducts;
        this.products.forEach((a:any)=>{
          Object.assign(a,{total:a.price})
        })
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
        console.log(this.products);
        this.products.forEach((a:any)=>{
          Object.assign(a,{total:a.price})
        })
        console.log(data);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

}
