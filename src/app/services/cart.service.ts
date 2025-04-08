import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
 
  public cartItemList :Product[]=[];
 
 
  public productList = new BehaviorSubject<Product[]>([]);
 
  saveCartToSessionStorage() {
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  }
 
  loadCartFromSessionStorage() {
    const storedCart = sessionStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItemList = JSON.parse(storedCart);
      this.productList.next(this.cartItemList);
    }
  }
 
 
  constructor() {
    this.loadCartFromSessionStorage();
  }
 
  getProducts(){
    return this.productList.asObservable();
  }
 
  setProducts(products:Product[]){
    this.cartItemList.push(...products);
    this.productList.next(products);
  }
 
  addToCart(product: Product) {
    const productInCart = this.cartItemList.find((item) => item.id === product.id);
 
    if (productInCart) {
      productInCart.quantity += product.quantity;
     
    }
      else {
      this.cartItemList.push({...product,quantity:product.quantity || 1});
    }
 
    this.productList.next(this.cartItemList);
    this.saveCartToSessionStorage();
    console.log(this.cartItemList);
  }

  getCartItem(productId:number): Product | undefined {
    return this.cartItemList.find(item => item.id === productId);
  }
 
  getTotalPriceOfAllProducts(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: Product) => {
      grandTotal += a.price * a.quantity;
    });
    return grandTotal;
  }
  
  removeCartItem(product: Product) {
    this.cartItemList = this.cartItemList.filter((item) => item.id !== product.id);
    this.productList.next(this.cartItemList);
    this.saveCartToSessionStorage();
  }
 
  removeAllCartItems(){
    this.cartItemList=[];
    this.productList.next(this.cartItemList);
    this.saveCartToSessionStorage();
  }
}