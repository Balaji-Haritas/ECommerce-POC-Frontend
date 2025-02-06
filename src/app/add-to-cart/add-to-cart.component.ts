import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartserviceService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart',
  imports: [CommonModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {
  emptyCart() {
    this.cartService.removeAllCartItems();
    }
    removeCartItem(product: Product) {
     this.cartService.removeCartItem(product);
    }
     
      public products:any=[];
     
      public grandTotal!:number;
     
      constructor(private router: Router,private cartService:CartserviceService) {}
     
      ngOnInit(){
       this.cartService.getProducts().subscribe(
        res=>{
          this.products=res;
          this.grandTotal=this.cartService.getTotalPriceOfAllProducts();
        }
       )
      }
      navigateToOtherPage() {
        this.router.navigate(['/products']);
      }
}
