import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { ApiService } from '../apihandler/apihandler.service';
import { Shared } from '../shared/shared.service';
import { IEmployee } from '../data/employee/employee.data';
import { ISale } from '../data/sales/sales.data';
import { ISupplier } from '../data/supplier/supplier.data';
import * as moment from 'moment';

@Injectable()
export class ValidatorService {
  constructor(private apiService: ApiService, private alertService: AlertService) {

  }
  checkEmployeeIDAvailability(employees: IEmployee[], id: string) {
    if (employees.some(arrVal => String(id) === String(arrVal.EmpID))) {
      const isIDExist = true;
      const isDateExist = true;
      this.alertService.error('Employee ID ' + id + ' is already taken');
    } else {
      isIDExist = false;
    }
    return isIDExist;
  }

  checkSaleIDAvailability(sales: ISale[], id: string) {
    if (sales.some(arrVal => String(id) === String(arrVal.SaleID))) {
      const isIDExist = true;
      this.alertService.error('Sale ID ' + id + ' is already taken');
    } else {
      isIDExist = false;
    }
    return isIDExist;
  }

  checkDateAvailability(records: any, date: Date) {
    if (records.some(arrVal => String(date) === String(arrVal.Date))) {
      var isDateExist = true;
      this.alertService.error('Record already added for the date ' + date);
    }
    else {
      isDateExist = false;
    }
    return isDateExist;
  }

  userNameValidation(username: string) {
    var userNameExist = false;
    this.apiService.getUserNameCheck(Shared.URL_EXTENSION_USERNAME_CHECK, username) // 
      .subscribe(
      data => {
        if (data === 1) {
          var userNameExist = true;
          this.alertService.error('User Name ' + username + ' is already taken');
        }
        else {
          userNameExist = false;
        }

      },
      err => {
        if (err.status === '404') {
          userNameExist = false;
        }
        else {
          this.alertService.error('Server Error Code: ' + err.status);
        }
      }
      );
    return userNameExist;
  }
  MatchPassword(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      this.alertService.error('Password does not match');
      return false;
    } else {
      return true;
    }
  }
  fixDate(record: any) {
    const dateFixeddRecords: any = [];
    for (const sale of record) {
      const dateTime = moment(sale.Date).format('YYYY-MM-DD');
      sale.Date = dateTime;
      dateFixeddRecords.push(sale);
    }
    return dateFixeddRecords;
  }
  momentDatefix(date: any) {
    return moment(date).subtract(1, 'months').format('YYYY-MM-DD');
  }
}
