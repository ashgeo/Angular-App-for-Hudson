import { Injectable, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apihandler/apihandler.service';
import { SupplierName} from '../services/data/suppliernames/suppliername.data';
@Component({
  moduleId: module.id,
  selector: 'suppliername',
  templateUrl: 'suppliernames.component.html'
})

export class SupplierNameComponent {
  private urlExtension = '/api/suppliername/authorize';
    supplierNames: SupplierName[];
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
        this.supplierNames = data;
      });
    
  }
    getEmployeeNames()
    {
        this.apiService.getRecords(this.urlExtension) // note, removed this.countries = 
      .subscribe(
      (data: any) => {
        this.supplierNames = data;
      });
    }
}
