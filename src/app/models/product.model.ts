import { Category } from "./category.models";

export interface Product {
    id: number
    name: string;
    description: string;
    price: number;
    categoryId: number; 
    category?: Category;
    imageUrl : string;
    quantity:number;
  }

  export interface Token{
    token: string;
    userName: string;
  }
  

  