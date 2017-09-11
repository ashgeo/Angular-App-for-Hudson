import { Injectable, Component, OnInit } from '@angular/core';
import { IEmployee } from '../employee/employee.data';
@Component({
  moduleId: module.id,
  
})

export class Wages {

    constructor(PayID:number ,PayDate: Date, StartTime: Date, FinishTime: Date, TotalHours: number,
         TotalAmount: number, PayDue: number,IsPaid: number, employee:IEmployee) {

    }
}