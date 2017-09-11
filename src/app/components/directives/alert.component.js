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
var alert_service_1 = require("../services/alert/alert.service");
var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
        this.alerts = [];
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.alertService.getMessage().subscribe(message => { this.message = message; });
        this.alertService.getMessage().subscribe(function (alert) {
            if (!alert) {
                // clear alerts when an empty alert is received
                _this.alerts = [];
                return;
            }
            // add alert to array
            _this.alerts.push(alert);
        });
    };
    AlertComponent.prototype.removeAlert = function (alert) {
        this.alerts = this.alerts.filter(function (x) { return x !== alert; });
    };
    AlertComponent.prototype.cssClass = function (alert) {
        if (!alert) {
            return;
        }
        // return css class based on alert type
        switch (alert.type) {
            case alert_service_1.AlertType.Success:
                return 'alert alert-success';
            case alert_service_1.AlertType.Error:
                return 'alert alert-danger';
            case alert_service_1.AlertType.Info:
                return 'alert alert-info';
            case alert_service_1.AlertType.Warning:
                return 'alert alert-warning';
        }
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'alert',
        templateUrl: 'alert.component.html'
    }),
    __metadata("design:paramtypes", [alert_service_1.AlertService])
], AlertComponent);
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=alert.component.js.map