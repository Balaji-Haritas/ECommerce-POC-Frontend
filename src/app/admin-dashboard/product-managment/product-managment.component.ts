import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-product-managment',
  imports: [CommonModule],
  templateUrl: './product-managment.component.html',
  styleUrls: ['./product-managment.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class ProductManagmentComponent {
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService,
    private notificationService:NotificationService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.log('Error Fetching Products', error);
      }
    );
  }

  createNewProduct() {
    this.router.navigate(['admin/add-product']);
  }

  editProduct(id: number): void {
    this.router.navigate(['admin/add-product', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.notificationService.showSuccess('Product Deleted!','Close')
        this.loadProducts();
      },
      error => {
        console.log('Error deleting product:', error);
        this.notificationService.showError('Error Deleting the Product','Close')
      }
    );
  }
}
