import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formdata',
  imports: [ReactiveFormsModule, FormsModule, CommonModule,RouterModule],
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css'],
  // providers: [ProductService]
})
export class FormdataComponent implements OnInit {
  
  constructor(private productService : ProductService){

  }

  // private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      type: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), this.nonNegativeValidator]),
      // productImage: new FormControl(null, Validators.required)
    });
  }

  // onFileSelect(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     (this.productForm.controls['productImage'] as FormControl).setValue(file);
  //     (this.productForm.controls['productImage'] as FormControl).updateValueAndValidity();
  //   } else {
  //     console.error('No file selected.');
  //   }
  // }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value as Product; // Cast form values to Product model
      this.productService.submitProduct(productData).subscribe({
        next: (response) => {
          console.log('Product submitted successfully:', response);
          this.showPopup('Product submitted successfully');
        },
        error: (error) => {
          console.error('Error submitting product:', error);
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
