// import { Injectable } from '@angular/core';
// import { Router, NavigationStart } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
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
// @Injectable()
// export class AlertService {
//     private subject = new Subject<any>();
//     private keepAfterNavigationChange = false;
//     private  mergedMsg:string;
//     constructor(private router: Router) {
//         // clear alert message on route change
//         router.events.subscribe(event => {
//             if (event instanceof NavigationStart) {
//                 if (this.keepAfterNavigationChange) {
//                     // only keep for a single location change
//                     this.keepAfterNavigationChange = false;
//                 } else {
//                     // clear alert
//                     this.subject.next();
//                 }
//             }
//         });
//     }
//     success(message: string, keepAfterNavigationChange = false) {
//         this.keepAfterNavigationChange = keepAfterNavigationChange;
//         this.subject.next({ type: 'success', text: message });
//     }
//     error(message: string, keepAfterNavigationChange = false) {
//         this.mergedMsg+=(message+"\n");
//         this.keepAfterNavigationChange = keepAfterNavigationChange;
//         this.subject.next({ type: 'error', text: this.mergedMsg });
//     }
//     info(message: string, keepAfterNavigationChange = false) {
//         this.keepAfterNavigationChange = keepAfterNavigationChange;
//         this.subject.next({ type: 'info',  text: message });
//     }
//     getMessage(): Observable<any> {
//         return this.subject.asObservable();
//     }
//     alert(type: AlertType, message: string, keepAfterNavigationChange = false) {
//         this.keepAfterNavigationChange = keepAfterNavigationChange;
//         this.subject.next(<Alert>{ type: type, message: message });
//     }
//     clear() {
//         // clear alerts
//          this.subject.next
//         this.subject.next();
//     }
// }
// export class Alert {
//     type: AlertType;
//     message: string;
// }
// export enum AlertType {
//     Success,
//     error,
//     Info,
//     Warning
// }
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Subject_1 = require("rxjs/Subject");
var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new Subject_1.Subject();
        this.keepAfterRouteChange = false;
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (_this.keepAfterRouteChange) {
                    // only keep for a single route change
                    _this.keepAfterRouteChange = false;
                }
                else {
                    // clear alert messages
                    _this.clear();
                }
            }
        });
    }
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AlertService.prototype.success = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    };
    AlertService.prototype.error = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    };
    AlertService.prototype.info = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    };
    AlertService.prototype.warn = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    };
    AlertService.prototype.alert = function (type, message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: type, message: message });
    };
    AlertService.prototype.clear = function () {
        // clear alerts
        this.subject.next();
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], AlertService);
exports.AlertService = AlertService;
var Alert = (function () {
    function Alert() {
    }
    return Alert;
}());
exports.Alert = Alert;
var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
//# sourceMappingURL=alert.service.js.map