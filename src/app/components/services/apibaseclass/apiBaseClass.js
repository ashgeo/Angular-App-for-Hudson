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
var http_1 = require("@angular/http");
var alert_service_1 = require("../alert/alert.service");
var shared_service_1 = require("../shared/shared.service");
var APIBaseClass = (function () {
    // public  headers =null;
    function APIBaseClass(http, alertService, options) {
        this.http = http;
        this.alertService = alertService;
        //public EndPointUrl = 'http://clipper-api.mavericktechlabs.com.au';
        this.EndPointUrl = shared_service_1.Shared.BASE_URL_ENDPOINT;
        this.currentUser = "";
        this.options = "";
        // this.headers = new Headers();
        this.currentUser = localStorage.getItem('currentUser');
        // headers.append('Authorization', `Bearer ${this.currentUser}`);
    }
    APIBaseClass.prototype.parseCurrentUser = function (user) {
        var parrsedCurrentUser = JSON.parse(user);
        var token = parrsedCurrentUser.access_token;
        return token;
    };
    return APIBaseClass;
}());
APIBaseClass = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, alert_service_1.AlertService, http_1.RequestOptions])
], APIBaseClass);
exports.APIBaseClass = APIBaseClass;
//# sourceMappingURL=apiBaseClass.js.map