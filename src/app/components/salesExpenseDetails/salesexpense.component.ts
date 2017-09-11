import { Injectable, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apihandler/apihandler.service';
import { SalesExpense} from '../services/data/salesexpense/salesexpense.data';
@Component({
  moduleId: module.id,
  selector: 'salesexpense',
  templateUrl: 'salesexpense.component.html'
})

export class SalesExpenseComponent {
  private urlExtension = '/api/salesbalance/authorize';
    salesexpenses: SalesExpense[];
  constructor(private apiService: ApiService) {   
  }
  ngOnInit() {
    this.getWagesRecords();

    //this.getEmployeeNames()
    //this.getSaleRecords(111);
  }
   getWagesRecords() {
    this.apiService.getRecords(this.urlExtension) // note, removed this.countries = 
      .subscribe(
      (data: any) => {
        this.salesexpenses = data;
      });
    
  }
}