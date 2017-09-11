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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var ApiService = (function (_super) {
    __extends(ApiService, _super);
    function ApiService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApiService.prototype.getAuthenticatedRecord = function (urlExtension) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get(this.EndPointUrl + urlExtension)
            .map(function (response) {
            var sales = response.json();
            if (sales) {
            }
            else {
                alert("null");
            }
        });
    };
    ApiService.prototype.getRecords = function (urlExtension) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', "Bearer " + token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.EndPointUrl + urlExtension, options)
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.getRecord = function (urlExtension, id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', "Bearer " + token);
        var options = new http_1.RequestOptions({ headers: headers, search: 'id=' + id });
        return this.http.get(this.EndPointUrl + urlExtension, options)
            .map(function (response) { return response.json(); });
    };
    ApiService.prototype.getUserNameCheck = function (urlExtension, userName) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', "Bearer " + token);
        var options = new http_1.RequestOptions({ headers: headers, search: 'UserName=' + userName });
        return this.http.get(this.EndPointUrl + urlExtension, options)
            .map(this.extractData);
    };
    ApiService.prototype.postRecord = function (urlExtension, model) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var token = this.parseCurrentUser(this.currentUser);
        console.log(token);
        headers.append('Authorization', "Bearer " + token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.EndPointUrl + urlExtension, model, options)
            .map(this.extractData);
    };
    ApiService.prototype.putRecord = function (urlExtension, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', "Bearer " + token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.EndPointUrl + urlExtension + id, body, options)
            .map(this.extractData);
    };
    ApiService.prototype.deleteRecord = function (urlExtension, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var token = this.parseCurrentUser(this.currentUser);
        headers.append('Authorization', "Bearer " + token);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.EndPointUrl + urlExtension + id, options)
            .map(this.extractData);
    };
    ApiService.prototype.handleError = function (error) {
        this.alertService.error(error.json().error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ApiService.prototype.extractData = function (res) {
        if (res.status == 200) {
            return 1;
        }
        else {
            return 0;
        }
    };
    ApiService.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.message || error);
    };
    ApiService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    return ApiService;
}(apiBaseClass_1.APIBaseClass));
ApiService = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=apihandler.service.js.map