import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DatePickerModule } from 'ng2-datepicker';

import { routing, appRoutingProviders } from './app.routing'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustomFormsModule } from 'ng2-validation';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
import { SalesComponent } from './components/salesDetails/sales.component';
import { LineChartDemoComponent } from './components/linegraph/linegraph.component';
import { EmployeeComponent } from './components/employeeDetails/employee.component';
import { SupplierComponent } from './components/supplierDetails/supplier.component';
import { WagesComponent } from './components/wagesDetails/wages.component';
import { RolesComponent } from './components/rolesDetails/roles.component';
import { SalesExpenseComponent } from './components/salesexpenseDetails/salesexpense.component';
import { SupplierNameComponent } from './components/supplierNameDetails/suppliernames.component';
import { UserAccountComponent } from './components/userAccountDetails/useraccount.component';

import { AuthService } from './components/services/auth/auth.service';
import { AuthCheck } from './components/authcheck/authcheck';
import { AlertService } from './components/services/alert/alert.service';
import { AlertComponent } from './components/directives/alert.component';
import { ClearFormService } from './components/services/clearform/clearform.service';
import { APIBaseClass } from './components/services/apibaseclass/apiBaseClass';
import { ApiService } from './components/services/apihandler/apihandler.service';
import { IEmployee } from './components/services/data/employee/employee.data';
import { ISale } from './components/services/data/Sales/sales.data';
import { IEmpRole } from './components/services/data/empRole/empRole.data';
import { ISupplier } from './components/services/data/supplier/supplier.data';
import { Wages } from './components/services/data/wages/wages.data';
import { Role } from './components/services/data/roles/role.data';
import { SalesExpense } from './components/services/data/salesexpense/salesexpense.data';
import { SupplierName } from './components/services/data/suppliernames/supplierName.data';
import { UserAccount } from './components/services/data/useraccounts/useraccount.data';
import { Shared } from './components/services/shared/shared.service';
import { CurdOperation} from './components/services/curdEnum/curdEnum.service';
import { ValidatorService } from './components/services/validator/validator.service';


@NgModule({
  declarations: [AppComponent, HomeComponent, ProfileComponent, LoginComponent, DashBoardComponent,
                 AlertComponent, NavbarComponent, SidebarComponent, LineChartDemoComponent,
                 SalesComponent, EmployeeComponent, SupplierComponent, WagesComponent, RolesComponent,
                 SalesExpenseComponent, SupplierNameComponent, UserAccountComponent],

  imports: [
             BrowserModule, routing, FormsModule, ReactiveFormsModule, HttpModule, ChartsModule, Ng2Bs3ModalModule, 
             CustomFormsModule, DatePickerModule
            ],

  providers: [appRoutingProviders, AuthService, AlertService, AuthCheck, ClearFormService, APIBaseClass,
              ApiService, ValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
