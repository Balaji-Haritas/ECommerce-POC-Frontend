import { Routes } from '@angular/router';
import { FormdataComponent } from './formdata/formdata.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  
    {path:'admin' , component:FormdataComponent},
    {path:'user',  component:DashboardComponent},
    
];
