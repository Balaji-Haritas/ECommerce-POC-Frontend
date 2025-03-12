import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'https://localhost:7131/api/Category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      map(response => response.$values || [])
    );
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`https://localhost:7131/api/Category/${categoryId}/products`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${categoryId}`);
  }

}
