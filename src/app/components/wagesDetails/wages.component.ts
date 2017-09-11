import { Injectable, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apihandler/apihandler.service';
import { Wages} from '../services/data/wages/wages.data';
@Component({
  moduleId: module.id,
  selector: 'wages',
  templateUrl: 'wages.component.html'
})

export class WagesComponent {
  private urlExtension = '/api/employeewages/authorize';
    wages: Wages[];
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
        this.wages = data;
      });
    
  }
    getEmployeeNames()
    {
        this.apiService.getRecords(this.urlExtension) // note, removed this.countries = 
      .subscribe(
      (data: any) => {
        this.wages = data;
      });
    }
}
