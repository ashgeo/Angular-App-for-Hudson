import { Injectable, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apihandler/apihandler.service';
import { UserAccount} from '../services/data/useraccounts/useraccount.data';
@Component({
  moduleId: module.id,
  selector: 'useraccount',
  templateUrl: 'useraccount.component.html'
})

export class UserAccountComponent {
  private urlExtension = '/api/UserAccount/authorize';
    userAccounts: UserAccount[];
  constructor(private apiService: ApiService) {   
  }
  ngOnInit() {
    this.getUserRecords();
    //this.getEmployeeNames()
    //this.getSaleRecords(111);
  }
   getUserRecords() {
    this.apiService.getRecords(this.urlExtension) // note, removed this.countries = 
      .subscribe(
      (data: any) => {
        this.userAccounts = data;
      });
    
  }
    getUserRecord()
    {
        this.apiService.getRecords(this.urlExtension) // note, removed this.countries = 
      .subscribe(
      (data: any) => {
        this.userAccounts = data;
      });
    }
}
