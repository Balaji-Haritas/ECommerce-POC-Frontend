import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.models';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  private snackBar = inject(MatSnackBar);
  categoryForm: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder,private categoryService:CategoryService) {
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

      if (categoryExists){
        this.showPopup('Category already Exists.Please enter a different category name.');
      }else {
        const newCategory: Category = {
          categoryId:0,
          categoryName: categoryName
        };
        this.categoryService.addCategory(newCategory).subscribe(
        response => {
          console.log('Category added successfully:', response);
          this.showPopup('Category added successfully!');
          this.categoryForm.reset();
          this.loadCategories();//to load the new category into db
        },
        error => {
          console.error('Error adding category:', error);
          this.showPopup('Error adding category!');
        }
      );} 
    }
  }
    private showPopup(message: string) {
      this.snackBar.open(message, 'Close', {
        duration: 3000, 
        verticalPosition: 'top', 
      });
    }
  } 
