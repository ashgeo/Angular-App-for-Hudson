"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var LineChartDemoComponent = (function () {
    function LineChartDemoComponent() {
        // lineChart
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40, 60, 65], label: '2015' },
            { data: [28, 64, 40, 19, 86, 27, 90], label: '2016' },
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sptember', 'October', 'November', 'December'];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    LineChartDemoComponent.prototype.randomize = function () {
        var _lineChartData = new Array(this.lineChartData.length);
        for (var i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (var j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    };
    // events
    LineChartDemoComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    LineChartDemoComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return LineChartDemoComponent;
}());
LineChartDemoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'saleschart',
        templateUrl: 'saleschart.component.html'
    })
], LineChartDemoComponent);
exports.LineChartDemoComponent = LineChartDemoComponent;
//# sourceMappingURL=linegraph.component.js.map