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

  getProductsByCategoryType(type: string): Observable<Product[]> 
  { 
    return this.http.get<Product[]>(`https://localhost:7131/api/Product/category/${type}`); 
  }

}
