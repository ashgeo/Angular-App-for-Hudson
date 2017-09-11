"use strict";
var router_1 = require("@angular/router");
var profile_component_1 = require("./components/profile/profile.component");
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var authcheck_1 = require("./components/authcheck/authcheck");
var sales_component_1 = require("./components/salesDetails/sales.component");
var employee_component_1 = require("./components/employeeDetails/employee.component");
var supplier_component_1 = require("./components/supplierDetails/supplier.component");
var wages_component_1 = require("./components/wagesDetails/wages.component");
var roles_component_1 = require("./components/rolesDetails/roles.component");
var salesexpense_component_1 = require("./components/salesexpenseDetails/salesexpense.component");
var suppliernames_component_1 = require("./components/supplierNameDetails/suppliernames.component");
var useraccount_component_1 = require("./components/userAccountDetails/useraccount.component");
var appRoutes = [
    {
        path: '',
        component: dashboard_component_1.DashBoardComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
    },
    { path: 'dashboard',
        component: dashboard_component_1.DashBoardComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    { path: 'sales',
        component: sales_component_1.SalesComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    { path: 'employee',
        component: employee_component_1.EmployeeComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    { path: 'supplier',
        component: supplier_component_1.SupplierComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    { path: 'wages',
        component: wages_component_1.WagesComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    { path: 'roles',
        component: roles_component_1.RolesComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    { path: 'salesexpense',
        component: salesexpense_component_1.SalesExpenseComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    { path: 'suppliername',
        component: suppliernames_component_1.SupplierNameComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    { path: 'useraccount',
        component: useraccount_component_1.UserAccountComponent,
        canActivate: [authcheck_1.AuthCheck]
    },
    // otherwise redirect to home
    { path: '**',
        redirectTo: 'login'
    }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map