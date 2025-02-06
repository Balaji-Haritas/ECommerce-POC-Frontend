import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'https://localhost:7131/api/Category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`https://localhost:7131/api/Category/${categoryId}/products`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`https://localhost:7131/api/Category`, category);
  }

  updateCategory(category:Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${category.categoryId}`, category);
  }
}
