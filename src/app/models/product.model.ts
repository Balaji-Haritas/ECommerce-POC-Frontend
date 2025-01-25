import { Category } from "./category.models";

export interface Product {
    id?: number
    name: string;
    description: string;
    price: number;
    categoryId: number; 
    category?: Category
    // productImage: File | null; // Assuming the image is a file input
  }
  

  