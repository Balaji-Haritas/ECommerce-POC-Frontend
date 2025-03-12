import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.models';
import { Router } from '@angular/router';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router,
    private notificationService:NotificationService) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });
  }

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

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryName = this.categoryForm.value.categoryName.trim();
      const categoryExists = this.categories.some(category => category.categoryName.toLowerCase() === categoryName.toLowerCase());

      if (categoryExists) {
        this.notificationService.showWarning('Category already exists. Please enter a different category name.','Close');
      } else {
        const newCategory: Category = {
          categoryId: 0,
          categoryName: categoryName
        };
        this.categoryService.addCategory(newCategory).subscribe(
          response => {
            console.log('Category added successfully:', response);
            this.notificationService.showSuccess('Category added successfully!','Close');
            this.categoryForm.reset();
            this.loadCategories();
          },
          error => {
            console.error('Error adding category:', error);
            this.notificationService.showError('Error adding category!','Close');
          }
        );
      }
    }
  }  

  cancel(): void {
    this.router.navigate(['/admin/category-management']);
  }

}
