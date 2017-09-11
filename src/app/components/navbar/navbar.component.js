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
var auth_service_1 = require("../services/auth/auth.service");
var router_1 = require("@angular/router");
var NavbarComponent = (function () {
    function NavbarComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isIn = false; // store state
    }
    NavbarComponent.prototype.toggleState = function () {
        var bool = this.isIn;
        this.isIn = bool === false ? true : false;
    };
    NavbarComponent.prototype.isActive = function () {
        return !this.authService.isLogedIn();
    };
    NavbarComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['login']);
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ct-navbar',
        templateUrl: 'navbar.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map