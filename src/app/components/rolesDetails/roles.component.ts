import { Injectable, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/apihandler/apihandler.service';
import { Role} from '../services/data/roles/role.data';
@Component({
  moduleId: module.id,
  selector: 'roles',
  templateUrl: 'roles.component.html'
})

export class RolesComponent {
  private urlExtension = '/api/employeerole/authorize';
    roles: Role[];
  constructor(private apiService: ApiService) {   
  }

ngOnInit() {
    this.getRolesRecords();

    //this.getEmployeeNames()
    //this.getSaleRecords(111);
  }
getRolesRecords()
{
this.apiService.getRecords(this.urlExtension) // note, removed this.countries = 
      .subscribe(
      (data: any) => {
        this.roles = data;
      });
}

}

