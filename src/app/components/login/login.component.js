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
var auth_service_1 = require("../services/auth/auth.service");
var alert_service_1 = require("../services/alert/alert.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.error = '';
        this.localUser = {
            username: '',
            password: ''
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.localUser)
            .subscribe(function (data) {
            //this.router.navigate(['dashboard']);
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    LoginComponent.prototype.clearfield = function () {
        this.localUser.username = '';
        this.localUser.password = '';
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        auth_service_1.AuthService,
        alert_service_1.AlertService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map