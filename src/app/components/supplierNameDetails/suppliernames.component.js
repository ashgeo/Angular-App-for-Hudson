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
var SupplierNameComponent = (function () {
    function SupplierNameComponent(apiService) {
        this.apiService = apiService;
        this.urlExtension = '/api/suppliername/authorize';
    }
    SupplierNameComponent.prototype.ngOnInit = function () {
        this.getWagesRecords();
        //this.getEmployeeNames()
        //this.getSaleRecords(111);
    };
    SupplierNameComponent.prototype.getWagesRecords = function () {
        var _this = this;
        this.apiService.getRecords(this.urlExtension) // note, removed this.countries = 
            .subscribe(function (data) {
            _this.supplierNames = data;
        });
    };
    SupplierNameComponent.prototype.getEmployeeNames = function () {
        var _this = this;
        this.apiService.getRecords(this.urlExtension) // note, removed this.countries = 
            .subscribe(function (data) {
            _this.supplierNames = data;
        });
    };
    return SupplierNameComponent;
}());
SupplierNameComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'suppliername',
        templateUrl: 'suppliernames.component.html'
    }),
    __metadata("design:paramtypes", [apihandler_service_1.ApiService])
], SupplierNameComponent);
exports.SupplierNameComponent = SupplierNameComponent;
//# sourceMappingURL=suppliernames.component.js.map