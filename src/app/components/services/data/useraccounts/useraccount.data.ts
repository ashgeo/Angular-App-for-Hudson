import { Injectable, Component, OnInit } from '@angular/core';
import { IEmployee } from '../employee/employee.data';
@Component({
})

export class UserAccount {
    constructor(EmpID:number ,UserRole: string, UserName: string, Password: string,employee:IEmployee) {
    }
}