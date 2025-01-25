import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './admin-dashboard/add-product/add-product.component';
import { AddCategoryComponent } from './admin-dashboard/add-category/add-category.component';

export const routes: Routes = [
  
    {path:'admin' , component:AdminDashboardComponent,children:[
        {path:'add-products',component:AddProductComponent},
        {path:'add-category',component:AddCategoryComponent}
    ]},
    {path:'products',  component:DashboardComponent}, // route for users
    
];
