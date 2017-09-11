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
var apihandler_service_1 = require("../services/apihandler/apihandler.service");
var alert_service_1 = require("../services/alert/alert.service");
var shared_service_1 = require("../services/shared/shared.service");
var forms_1 = require("@angular/forms");
var curdEnum_service_1 = require("../services/curdEnum/curdEnum.service");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var validator_service_1 = require("../services/validator/validator.service");
var SalesComponent = (function () {
    function SalesComponent(apiService, alertService, formBuilder, validatorService) {
        this.apiService = apiService;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.validatorService = validatorService;
        this.indLoading = false;
        this.isSaleIDExist = false;
        this.isSaleDateExist = false;
    }
    SalesComponent.prototype.ngOnInit = function () {
        this.salesForm = this.formBuilder.group({
            SaleID: [''],
            Date: ['', forms_1.Validators.required],
            FtposAmount: ['', forms_1.Validators.required],
            CashAmount: ['', forms_1.Validators.required],
            BlueBoxAmount: [''],
            CashLeft: ['', forms_1.Validators.required],
            TotalSale: ['', forms_1.Validators.required],
        });
        this.getSaleRecords();
    };
    SalesComponent.prototype.getSaleRecords = function () {
        var _this = this;
        this.apiService.getRecords(shared_service_1.Shared.URL_EXTENSION_SALES_GET) // note, removed this.countries = 
            .subscribe(function (data) {
            _this.sales = data;
        }, function (error) { return _this.alertService.error(error); });
    };
    SalesComponent.prototype.getSaleRecord = function (id) {
        var _this = this;
        this.apiService.getRecord(shared_service_1.Shared.URL_EXTENSION_SALES_GET_ID + id, id) //
            .subscribe(function (data) {
            _this.sale = data;
        });
    };
    SalesComponent.prototype.resetMessageStrings = function () {
        this.alertService.clear();
    };
    SalesComponent.prototype.addSaleRecord = function () {
        this.resetMessageStrings();
        this.dbops = curdEnum_service_1.CurdOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Sales";
        this.modalBtnTitle = "Add";
        this.salesForm.reset();
        this.modal.open();
        this.salesForm.controls["BlueBoxAmount"].disable();
    };
    SalesComponent.prototype.editEmployeeRecord = function (id) {
        this.resetMessageStrings();
        this.dbops = curdEnum_service_1.CurdOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit sale";
        this.modalBtnTitle = "Update";
        this.sale = this.sales.filter(function (x) { return x.SaleID == id; })[0];
        this.salesForm.patchValue({
            SaleID: this.sale.SaleID,
            Date: this.sale.Date,
            FtposAmount: this.sale.FtposAmount,
            CashAmount: this.sale.CashAmount,
            CashLeft: this.sale.CashLeft,
            TotalSale: this.sale.TotalSale,
        });
        this.modal.open();
        this.salesForm.controls["SaleID"].disable();
        this.salesForm.controls["BlueBoxAmount"].disable();
    };
    SalesComponent.prototype.deleteEmployeeRecord = function (id) {
        this.resetMessageStrings();
        this.dbops = curdEnum_service_1.CurdOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.sale = this.sales.filter(function (x) { return x.SaleID == id; })[0];
        this.salesForm.patchValue({
            SaleID: this.sale.SaleID,
            Date: this.sale.Date,
            FtposAmount: this.sale.FtposAmount,
            CashAmount: this.sale.CashAmount,
            CashLeft: this.sale.CashLeft,
            TotalSale: this.sale.TotalSale,
        });
        this.modal.open();
        this.salesForm.controls["SaleID"].disable();
    };
    SalesComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.resetMessageStrings();
        switch (this.dbops) {
            case curdEnum_service_1.CurdOperation.create:
                this.salesForm.controls["BlueBoxAmount"].enable();
                this.isSaleIDExist = this.validatorService.checkSaleIDAvailability(this.sales, formData._value.SaleID);
                this.isSaleDateExist = this.validatorService.checkSaleDateAvailability(this.sales, formData._value.Date);
                if (this.isSaleIDExist == false && this.isSaleDateExist == false) {
                    this.apiService.postRecord(shared_service_1.Shared.URL_EXTENSION_SALES_POST, formData._value).subscribe(function (data) {
                        if (data == 1) {
                            _this.alertService.success("Data successfully added.");
                            _this.getSaleRecords();
                            _this.isSaleIDExist = false;
                            _this.isSaleIDExist = false;
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
                this.salesForm.controls["BlueBoxAmount"].enable();
                this.salesForm.controls["SaleID"].enable();
                this.apiService.putRecord(shared_service_1.Shared.URL_EXTENSION_SALES_PUT_ID, formData._value.SaleID, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.alertService.success("Data successfully updated.");
                        _this.getSaleRecords();
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
                this.salesForm.controls["SaleID"].disable();
                this.apiService.deleteRecord(shared_service_1.Shared.URL_EXTENSION_SALES_DELETE_ID, formData._value.SaleID).subscribe(function (data) {
                    if (data == 1) {
                        _this.alertService.success("Data successfully deleted.");
                        _this.getSaleRecords();
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
    SalesComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.salesForm.enable() : this.salesForm.disable();
    };
    return SalesComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], SalesComponent.prototype, "modal", void 0);
SalesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sales',
        templateUrl: 'sales.component.html'
    }),
    __metadata("design:paramtypes", [apihandler_service_1.ApiService, alert_service_1.AlertService, forms_1.FormBuilder, validator_service_1.ValidatorService])
], SalesComponent);
exports.SalesComponent = SalesComponent;
//# sourceMappingURL=sales.component.js.map