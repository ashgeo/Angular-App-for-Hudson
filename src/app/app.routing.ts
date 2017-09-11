import{ModuleWithProviders} from '@angular/core';
import{Routes,RouterModule} from '@angular/router';

import{HomeComponent} from './components/home/home.component';
import{ProfileComponent} from './components/profile/profile.component';
import{LoginComponent} from './components/login/login.component';
import{DashBoardComponent} from './components/dashboard/dashboard.component';
import {AuthCheck } from './components/authcheck/authcheck';
import {SalesComponent } from './components/salesDetails/sales.component';
import {EmployeeComponent} from './components/employeeDetails/employee.component';
import {SupplierComponent} from './components/supplierDetails/supplier.component';
import {WagesComponent} from './components/wagesDetails/wages.component';
import {RolesComponent} from './components/rolesDetails/roles.component';
import {SalesExpenseComponent} from './components/salesexpenseDetails/salesexpense.component';
import {SupplierNameComponent} from './components/supplierNameDetails/suppliernames.component';
import {UserAccountComponent} from './components/userAccountDetails/useraccount.component';

const appRoutes :Routes=[
{
    path:'',
    component:DashBoardComponent,
    canActivate: [AuthCheck]
},
{
    path:'profile',
    component:ProfileComponent,
    canActivate: [AuthCheck] 
     
},
{
    path:'login',
    component:LoginComponent,
      
},
{   path: 'dashboard', 
    component:DashBoardComponent,
    canActivate: [AuthCheck]
},
{   path: 'sales', 
    component:SalesComponent,
    canActivate: [AuthCheck]
},
{   path: 'employee', 
    component:EmployeeComponent,
    canActivate: [AuthCheck]
},
{   path: 'supplier', 
    component:SupplierComponent,
    canActivate: [AuthCheck]
},
{   path: 'wages', 
    component:WagesComponent,
    canActivate: [AuthCheck]
},
{   path: 'roles', 
    component:RolesComponent,
    canActivate: [AuthCheck]
},
{   path: 'salesexpense', 
    component:SalesExpenseComponent,
    canActivate: [AuthCheck]
},
{   path: 'suppliername', 
    component:SupplierNameComponent,
    canActivate: [AuthCheck]
},
{   path: 'useraccount', 
    component:UserAccountComponent,
    canActivate: [AuthCheck]
},

// otherwise redirect to home
{   path: '**', 
    redirectTo: 'login' 
}

];
export const appRoutingProviders:any[]=[];
export const routing :ModuleWithProviders= RouterModule.forRoot(appRoutes);