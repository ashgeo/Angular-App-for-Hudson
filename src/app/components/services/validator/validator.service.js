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
var alert_service_1 = require("../alert/alert.service");
var apihandler_service_1 = require("../apihandler/apihandler.service");
var shared_service_1 = require("../shared/shared.service");
var ValidatorService = (function () {
    function ValidatorService(apiService, alertService) {
        this.apiService = apiService;
        this.alertService = alertService;
    }
    ValidatorService.prototype.checkEmployeeIDAvailability = function (employees, id) {
        if (employees.some(function (arrVal) { return String(id) === String(arrVal.EmpID); })) {
            var isIDExist = true;
            var isDateExist = true;
            this.alertService.error("Employee ID " + id + " is already taken");
        }
        else {
            isIDExist = false;
        }
        return isIDExist;
    };
    ValidatorService.prototype.checkSaleIDAvailability = function (sales, id) {
        if (sales.some(function (arrVal) { return String(id) === String(arrVal.SaleID); })) {
            var isIDExist = true;
            this.alertService.error("Sale ID " + id + " is already taken");
        }
        else {
            isIDExist = false;
        }
        return isIDExist;
    };
    ValidatorService.prototype.checkSaleDateAvailability = function (sales, date) {
        if (sales.some(function (arrVal) { return String(date) === String(arrVal.SaleID); })) {
            var isDateExist = true;
            this.alertService.error("Sale record already added for the date " + date);
        }
        else {
            isDateExist = false;
        }
        return isDateExist;
    };
    ValidatorService.prototype.userNameValidation = function (username) {
        var _this = this;
        var userNameExist = false;
        this.apiService.getUserNameCheck(shared_service_1.Shared.URL_EXTENSION_USERNAME_CHECK, username) // 
            .subscribe(function (data) {
            if (data == 1) {
                var userNameExist = true;
                _this.alertService.error("User Name " + username + " is already taken");
            }
            else {
                userNameExist = false;
            }
        }, function (err) {
            if (err.status == "404") {
                userNameExist = false;
            }
            else {
                _this.alertService.error("Server Error Code: " + err.status);
            }
        });
        return userNameExist;
    };
    ValidatorService.prototype.MatchPassword = function (password, confirmPassword) {
        if (password != confirmPassword) {
            this.alertService.error("Password does not match");
            return false;
        }
        else {
            return true;
        }
    };
    return ValidatorService;
}());
ValidatorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [apihandler_service_1.ApiService, alert_service_1.AlertService])
], ValidatorService);
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=validator.service.js.map