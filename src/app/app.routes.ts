import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductManagmentComponent } from './admin-dashboard/product-managment/product-managment.component';
import { CategoryManagmentComponent } from './admin-dashboard/category-managment/category-managment.component';
import { AddCategoryComponent } from './admin-dashboard/add-category/add-category.component';
import { AddProductComponent } from './admin-dashboard/add-product/add-product.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { LoginComponent } from './header/login/login.component';
import { SignupComponent } from './header/signup/signup.component';

export const routes: Routes = [

    {path:'admin' , component:AdminDashboardComponent,children:[
       
        {path:'category-management',component:CategoryManagmentComponent},
        {path:'add-category', component:AddCategoryComponent},
        {path:'product-management',component:ProductManagmentComponent}, 
        {path:'add-product', component:AddProductComponent},
        {path:'add-product/:id', component: AddProductComponent},

    ]},

    {path:'',redirectTo:'products',pathMatch:'full'},
    {path:'products',  component:DashboardComponent}, 
    {path:'cart', component:AddToCartComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent}

];
