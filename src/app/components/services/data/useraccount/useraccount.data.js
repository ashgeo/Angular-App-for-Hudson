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
var employee_data_1 = require("../employee/employee.data");
var UserAccount = (function () {
    function UserAccount(EmpID, UserRole, UserName, Password, employee) {
    }
    return UserAccount;
}());
UserAccount = __decorate([
    core_1.Component({}),
    __metadata("design:paramtypes", [Number, String, String, String, employee_data_1.Employee])
], UserAccount);
exports.UserAccount = UserAccount;
//# sourceMappingURL=useraccount.data.js.map