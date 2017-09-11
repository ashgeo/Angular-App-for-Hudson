"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../services/auth/auth.service");
var apihandler_service_1 = require("../services/apihandler/apihandler.service");
var alert_service_1 = require("../services/alert/alert.service");
var shared_service_1 = require("../services/shared/shared.service");
var validator_service_1 = require("../services/validator/validator.service");
var curdEnum_service_1 = require("../services/curdEnum/curdEnum.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var ng2_validation_1 = require("ng2-validation");
var EmployeeComponent = (function () {
    function EmployeeComponent(router, authenticationService, apiService, alertService, formBuilder, validatorService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.apiService = apiService;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.validatorService = validatorService;
        //roles: Array<IEmployee>;
        //selectedValue: string;
        //userObservable = new Subject<{ first: IEmployee }>();
        //msg: string;
        this.indLoading = false;
        //mySelect:number;
        this.isUserNameExist = false;
        this.isEmpIDExist = false;
        this.doesPasswordmatch = false;
        this.UserAccountUrlExtension = shared_service_1.Shared.URL_EXTENSION_USERNAME_CHECK;
    }
    EmployeeComponent.prototype.ngOnInit = function () {
        this.userFrm = this.formBuilder.group({
            EmpID: ['', forms_1.Validators.required],
            FirstName: ['', forms_1.Validators.required],
            LastName: ['', forms_1.Validators.required],
            EmpRole: ['', forms_1.Validators.required],
            Phone: ['', forms_1.Validators.required],
            Email: ['', forms_1.Validators.required],
            field: new forms_1.FormControl('', ng2_validation_1.CustomValidators.range([5, 9])),
            UserName: ['', forms_1.Validators.required],
            Password: ['', forms_1.Validators.required],
            ConfirmPassword: ['', forms_1.Validators.required]
        });
        this.getEmployeeRecords();
        this.getEmployeezRoleRecords();
    };
    EmployeeComponent.prototype.getEmployeezRoleRecords = function () {
        var _this = this;
        this.apiService.getRecords(shared_service_1.Shared.URL_EXTENSION_EMPROLE_GET) // 
            .subscribe(function (data) { _this.empRoles = data; }, function (error) { return _this.alertService.error(error); });
    };
    EmployeeComponent.prototype.getEmployeeRecords = function () {
        var _this = this;
        this.indLoading = true;
        this.apiService.getRecords(shared_service_1.Shared.URL_EXTENSION_EMP_GET) // 
            .subscribe(function (data) { _this.employees = data; _this.indLoading = false; }, function (error) { return _this.alertService.error(error); });
    };
    EmployeeComponent.prototype.getEmployeeRecord = function (id) {
        var _this = this;
        this.apiService.getRecord(shared_service_1.Shared.URL_EXTENSION_EMP_GET_ID + id, id) //
            .subscribe(function (data) {
            _this.employee = data;
        });
    };
    EmployeeComponent.prototype.addEmployeeRecord = function () {
        this.resetMessageStrings();
        this.dbops = curdEnum_service_1.CurdOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userFrm.reset();
        this.modal.open();
    };
    EmployeeComponent.prototype.editEmployeeRecord = function (id) {
        this.resetMessageStrings();
        this.dbops = curdEnum_service_1.CurdOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Employee";
        this.modalBtnTitle = "Update";
        this.employee = this.employees.filter(function (x) { return x.EmpID == id; })[0];
        this.userFrm.patchValue({
            EmpID: this.employee.EmpID,
            FirstName: this.employee.FirstName,
            LastName: this.employee.LastName,
            EmpRole: this.employee.EmpRole,
            Phone: this.employee.Phone,
            Email: this.employee.Email,
        });
        this.modal.open();
        this.userFrm.controls["EmpID"].disable();
        this.userFrm.controls["UserName"].disable();
        this.userFrm.controls["Password"].disable();
    };
    EmployeeComponent.prototype.deleteEmployeeRecord = function (id) {
        this.resetMessageStrings();
        this.dbops = curdEnum_service_1.CurdOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.employee = this.employees.filter(function (x) { return x.EmpID == id; })[0];
        this.userFrm.patchValue({
            EmpID: this.employee.EmpID,
            FirstName: this.employee.FirstName,
            LastName: this.employee.LastName,
            EmpRole: this.employee.EmpRole,
            Phone: this.employee.Phone,
            Email: this.employee.Email,
        });
        this.modal.open();
    };
    EmployeeComponent.prototype.resetMessageStrings = function () {
        this.alertService.clear();
    };
    EmployeeComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.resetMessageStrings();
        switch (this.dbops) {
            case curdEnum_service_1.CurdOperation.create:
                this.isUserNameExist = this.validatorService.userNameValidation(formData._value.UserName);
                this.isEmpIDExist = this.validatorService.checkEmployeeIDAvailability(this.employees, formData._value.EmpID);
                this.doesPasswordmatch = this.validatorService.MatchPassword(formData._value.Password, formData._value.ConfirmPassword);
                if (this.isUserNameExist == false && this.isEmpIDExist == false && this.doesPasswordmatch == true) {
                    this.apiService.postRecord(shared_service_1.Shared.URL_EXTENSION_EMP_POST, formData._value).subscribe(function (data) {
                        if (data == 1) {
                            _this.alertService.success("Data successfully added.");
                            _this.getEmployeeRecords();
                            _this.isEmpIDExist = false;
                            _this.isUserNameExist = false;
                        }
                        else {
                            _this.alertService.error("There is some issue in saving records, please contact to system administrator!");
                        }
                        _this.modal.dismiss();
                    }, function (error) {
                        _this.alertService.error(error);
                    });
                }
                break;
            case curdEnum_service_1.CurdOperation.update:
                this.userFrm.controls["EmpID"].enable();
                this.apiService.putRecord(shared_service_1.Shared.URL_EXTENSION_EMP_PUT_ID, formData._value.EmpID, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.alertService.success("Data successfully updated.");
                        _this.getEmployeeRecords();
                    }
                    else {
                        _this.alertService.error("There is some issue in saving records, please contact to system administrator!");
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.alertService.error(error);
                });
                break;
            case curdEnum_service_1.CurdOperation.delete:
                this.apiService.deleteRecord(shared_service_1.Shared.URL_EXTENSION_EMP_DELETE_ID, formData._value.EmpID).subscribe(function (data) {
                    if (data == 1) {
                        _this.alertService.success("Data successfully deleted.");
                        _this.getEmployeeRecords();
                    }
                    else {
                        _this.alertService.error("There is some issue in saving records, please contact to system administrator!");
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.alertService.error(error);
                });
                break;
        }
    };
    EmployeeComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    };
    return EmployeeComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], EmployeeComponent.prototype, "modal", void 0);
EmployeeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'employee',
        templateUrl: 'employee.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService,
        apihandler_service_1.ApiService, alert_service_1.AlertService, forms_1.FormBuilder, validator_service_1.ValidatorService])
], EmployeeComponent);
exports.EmployeeComponent = EmployeeComponent;
//# sourceMappingURL=employee.component.js.map