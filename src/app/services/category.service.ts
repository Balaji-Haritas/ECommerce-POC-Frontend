import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
