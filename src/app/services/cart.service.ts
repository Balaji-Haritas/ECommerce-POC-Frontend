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
 
 
   // getter and setter for observer to subscribe the data and get all products
  getProducts(){
    return this.productList.asObservable();// making the productList as asObservable
  }
 
  setProducts(products:Product[]){
    this.cartItemList.push(...products);
    this.productList.next(products);
  }
 
  // addToCart(product:Product){
  //   this.cartItemList.push(product);
  //   this.productList.next(this.cartItemList);
  //   this.saveCartToSessionStorage();
  //   this.getTotalPriceOfAllProducts();
  //   console.log(this.cartItemList);
   
  // }
 
  addToCart(product: Product) {
    const productInCart = this.cartItemList.find((item) => item.id === product.id);
 
    if (productInCart) {
      productInCart.quantity += 1;
     
    }
      else {
      product.quantity = 1;
      this.cartItemList.push(product);
    }
 
    this.productList.next(this.cartItemList);
    this.saveCartToSessionStorage();
    console.log(this.cartItemList);
  }
  // getTotalPriceOfAllProducts():number {
  //   let grandTotal=0;
  //   this.cartItemList.map((a:any)=>{
  //     grandTotal+=a.total;
  //   })
  //   return grandTotal;
  // }
 
  getTotalPriceOfAllProducts(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: Product) => {
      grandTotal += a.price * a.quantity;
    });
    return grandTotal;
  }
 
  // removeCartItem(product:Product){
  //   this.cartItemList.map((a:Product,index:number)=>{
  //    if(product.id === a.id){
  //     this.cartItemList.splice(index,1)
  //    }
  //   })
  //   this.productList.next(this.cartItemList);
  // }
 
 
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