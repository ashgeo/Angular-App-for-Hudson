"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var apiBaseClass_1 = require("../apibaseclass/apiBaseClass");
require("rxjs/add/operator/map");
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.urlExtension = "/token";
        return _this;
    }
    //private logedinUSer: any;
    // private tokenEndPointUrl = 'http://localhost:60776';
    //options: any;
    // error = "";
    // constructor(public http: Http) {
    // }
    AuthService.prototype.login = function (usercredentials) {
        var _this = this;
        this.isLoggedin = false;
        var myHeaders = new http_1.Headers();
        var credentials = 'grant_type=' + 'password' + '&username=' + usercredentials.username + '&password=' + usercredentials.password;
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: myHeaders });
        return this.http.post(this.EndPointUrl + this.urlExtension, credentials, options)
            .map(function (response) {
            var user = response.json();
            if (user && user.access_token) {
                window.localStorage.setItem('currentUser', JSON.stringify(user));
                _this.isLoggedin = true;
            }
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    AuthService.prototype.isLogedIn = function () {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        else {
            return false;
        }
    };
    return AuthService;
}(apiBaseClass_1.APIBaseClass));
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map