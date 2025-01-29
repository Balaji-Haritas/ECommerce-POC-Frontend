import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = 'https://localhost:7131/api/Product';
  constructor(private http: HttpClient) { }

 
  addProduct(data: Product): Observable<any> {
    return this.http.post<any>(this.baseUrl, data); 
  }

  getAllProducts(): Observable<Product[]> 
  { 
    return this.http.get<Product[]>(this.baseUrl); 
  }

  getProductsById(Id:number):Observable<Product>
  {
    return this.http.get<Product>(`https://localhost:7131/api/Product/${Id}`);
  }

  getProductByCategoryType(type: string): Observable<Product[]> 
  { 
    return this.http.get<Product[]>(`https://localhost:7131/api/Product/category/${type}`); 
  }

  updateProduct(product:Product):Observable<Product>
  {
    return this.http.put<Product>(`https://localhost:7131/api/Product/${product.id}`,product);
  }
}
