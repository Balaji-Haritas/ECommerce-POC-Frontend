import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { Category } from '../../models/category.models';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-managment',
  imports: [CommonModule,RouterModule],
  templateUrl: './category-managment.component.html',
  styleUrls: ['./category-managment.component.css']
})
export class CategoryManagmentComponent implements OnInit{

  categories: Category[] = [];

  constructor(private router: Router, private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }



  createNewCategory(): void {
    this.router.navigate(['admin/add-category']);   
  }

  deleteCategory(id: number): void {
    
  }
}


