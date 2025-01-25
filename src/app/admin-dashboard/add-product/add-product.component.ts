import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.models';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService:CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      details: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), this.nonNegativeValidator]],
      // productImage: [null, Validators.required]
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
     },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = {
        name: this.productForm.value.name,
        description: this.productForm.value.details,
        price: this.productForm.value.price,
        categoryId: this.productForm.value.type
      };

      this.productService.addProduct(productData).subscribe({
        next: (response) => {
          console.log('Product submitted successfully:', response);
          this.showPopup('Product submitted successfully');
          this.productForm.reset(); // Reset the form
        },
        error: (error) => {
          console.error('Error submitting product:', error);
          console.log('Full error response:', error);
          this.showPopup('Error submitting product');
        }
      });
    }
  }

  nonNegativeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value !== null && value < 0) {
      return {
        'negative': true
      };
    }
    return null;
  }

  private showPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top', // Position on the screen
    });
  }
}