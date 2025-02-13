import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.models';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../notifications/notification.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];
  isEditMode = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private notificationService:NotificationService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      details: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$"), this.nonNegativeValidator]],
      productImage: [null, Validators.required],
      quantity: ['', [Validators.required, this.nonNegativeValidator]]
    });

    this.loadCategories();

    // Setting Flag for Edit mode
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.isEditMode = true;
        this.loadProduct(productId);
      }
    });
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

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (product: Product) => {
        this.productForm.patchValue({
          id: product.id,
          name: product.name,
          type: product.categoryId,
          details: product.description,
          price: product.price,
          quantity: product.quantity
        });
      },
      error => {
        console.log('Error Loading Product', error);
      }
    );
  }

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.productForm.patchValue({ productImage: file });
    }
  }

  onSubmit(fileInput: HTMLInputElement): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'my_preset');

      this.http.post(`https://api.cloudinary.com/v1_1/dnephxvbi/image/upload`, formData).subscribe(
        (response: any) => {
          const productData: Product = {
            id: this.isEditMode ? this.productForm.value.id : 0,
            name: this.productForm.value.name,
            description: this.productForm.value.details,
            price: this.productForm.value.price,
            categoryId: this.productForm.value.type,
            imageUrl: response.secure_url,
            quantity: this.productForm.value.quantity
          };

          if (this.isEditMode) {
            this.productService.updateProduct(productData).subscribe({
              next: (response) => {
                this.notificationService.showSuccess("Product Updated Successfully",'Close');
                this.router.navigate(['admin/product-managment']);
              },
              error: (err) => {
                this.notificationService.showError("Error Updating Product",'Close');
              },
            });
          } else {
            this.productService.addProduct(productData).subscribe({
              next: (response) => {
                this.notificationService.showSuccess('Product submitted successfully','Close');
                this.productForm.reset();
                fileInput.value = '';
                this.router.navigate(['admin/product-managment']);
              },
              error: (error) => {
                this.notificationService.showError('Error submitting product','Close');
              }
            });
          }
        },
        error => {
          console.error('Error uploading image to Cloudinary:', error);
        }
      );
    } else {
      console.warn('Form is invalid or file is not selected');
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/product-management']);
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
}
