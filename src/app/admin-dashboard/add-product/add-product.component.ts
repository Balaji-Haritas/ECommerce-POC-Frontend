import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.models';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService:CategoryService,
    private snackBar: MatSnackBar,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      details: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), this.nonNegativeValidator]],
      productImage: [null, Validators.required],
      quantity:['',[Validators.required]]
    });

    this.loadCategories();

    //Setting Flag for Edit mode 
    this.route.params.subscribe(params => {
      const productId = params['Id'];
      if(productId){
        this.isEditMode = true;
        this.loadProduct(productId);
      }
    })
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

  loadProduct(productId:number):void{
    this.productService.getProductsById(productId).subscribe(
      (product : Product) =>{
        this.productForm.patchValue({
          id:product.id,
          name:product.name,
          type:product.categoryId,
          details:product.description,
          price:product.price
        });
      },error => {
        console.log('Error Loading Product',error);
      }
    )
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = {
        id : 0,
        name: this.productForm.value.name,
        description: this.productForm.value.details,
        price: this.productForm.value.price,
        categoryId: this.productForm.value.type,
        imageUrl:this.productForm.value.productImage,
        quantity:this.productForm.value.quantity
      };

      if(this.isEditMode){
        this.productService.updateProduct(productData).subscribe({
          next:(response) =>{
            console.log('Product Updated Successfuly',response);
            this.showPopup("Product Updated Successfully");
            this.router.navigate(['admin/product-managment']);
          },error:(err) => {
            console.log("Error Updating Product",err);
            this.showPopup("Error Updating Product");
          },
        })
      } else{
        this.productService.addProduct(productData).subscribe({
          next: (response) => {
            console.log('Product submitted successfully:', response);
            this.showPopup('Product submitted successfully');
            this.productForm.reset();
            this.router.navigate(['admin/product-managment']);
          },
          error: (error) => {
            console.error('Error submitting product:', error);
            console.log('Full error response:', error);
            this.showPopup('Error submitting product');
          }
        });
      }
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

  private showPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top', // Position on the screen
    });
  }
}