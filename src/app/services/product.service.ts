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

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getProductByCategoryType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${type}`);
  }
  //https://localhost:7131/api/Product?id=25
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`https://localhost:7131/api/Product/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
