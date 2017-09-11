import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/apihandler/apihandler.service';
import { AlertService } from '../services/alert/alert.service';
import { IEmployee } from '../services/data/employee/employee.data';
import { IEmpRole } from '../services/data/empRole/empRole.data';
import { Shared } from '../services/shared/shared.service';
import { ValidatorService } from '../services/validator/validator.service';
import { CurdOperation } from '../services/curdEnum/curdEnum.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Component({
  moduleId: module.id,
  selector: 'employee',
  templateUrl: 'employee.component.html'
})

export class EmployeeComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  employees: IEmployee[];
  employee: IEmployee;
  empRoles: IEmpRole[];
  employeeRole: IEmpRole;
  //roles: Array<IEmployee>;
  //selectedValue: string;
  //userObservable = new Subject<{ first: IEmployee }>();
  //msg: string;
  indLoading: boolean = false;
  userFrm: FormGroup;
  dbops: CurdOperation;
  modalTitle: string;
  modalBtnTitle: string
  errorString: string;
  //mySelect:number;
  isUserNameExist: boolean = false;
  isEmpIDExist: boolean = false;
  doesPasswordmatch:boolean=false; 
  private UserAccountUrlExtension = Shared.URL_EXTENSION_USERNAME_CHECK;
  constructor(private router: Router, private authenticationService: AuthService,
  private apiService: ApiService, private alertService: AlertService, private formBuilder: FormBuilder,private validatorService:ValidatorService ) {

  }

  ngOnInit() {  
    this.userFrm = this.formBuilder.group({
      EmpID: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmpRole: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', Validators.required],  
      field:new FormControl('', CustomValidators.range([5, 9])),
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['',Validators.required]  

    });
   this.getEmployeeRecords();
   this.getEmployeezRoleRecords();
  }
  getEmployeezRoleRecords() {
    this.apiService.getRecords(Shared.URL_EXTENSION_EMPROLE_GET) // 
      .subscribe((data: any) => { this.empRoles = data; }, error =>  this.alertService.error( <any>error));
  }
  getEmployeeRecords() {
    this.indLoading = true;
    this.apiService.getRecords(Shared.URL_EXTENSION_EMP_GET) // 
      .subscribe((data: any) => { this.employees = data; this.indLoading = false }, error =>  this.alertService.error( <any>error));
  }
  getEmployeeRecord(id: number) {
    this.apiService.getRecord(Shared.URL_EXTENSION_EMP_GET_ID + id, id) //
      .subscribe(
      (data: any) => {
        this.employee = data;
      });
  } 
  addEmployeeRecord() {  
    this.resetMessageStrings();
    this.dbops = CurdOperation.create;
    this.SetControlsState(true);
    this.modalTitle = "Add New User";
    this.modalBtnTitle = "Add";
    this.userFrm.reset();
    this.modal.open();
  }
  editEmployeeRecord(id: number) {
    this.resetMessageStrings();
    this.dbops = CurdOperation.update;
    this.SetControlsState(true);
    this.modalTitle = "Edit Employee";
    this.modalBtnTitle = "Update";
    this.employee = this.employees.filter(x => x.EmpID == id)[0];
    this.userFrm.patchValue({
      EmpID: this.employee.EmpID,
      FirstName: this.employee.FirstName,
      LastName: this.employee.LastName,
      EmpRole: this.employee.EmpRole,
      Phone: this.employee.Phone,
      Email: this.employee.Email,
    });
    this.modal.open();
    this.userFrm.controls["EmpID"].disable();
    this.userFrm.controls["UserName"].disable();
    this.userFrm.controls["Password"].disable();
  }
  deleteEmployeeRecord(id: number) {
    this.resetMessageStrings();
    this.dbops = CurdOperation.delete;
    this.SetControlsState(false);
    this.modalTitle = "Confirm to Delete?";
    this.modalBtnTitle = "Delete";
    this.employee = this.employees.filter(x => x.EmpID == id)[0];
    this.userFrm.patchValue({
      EmpID: this.employee.EmpID,
      FirstName: this.employee.FirstName,
      LastName: this.employee.LastName,
      EmpRole: this.employee.EmpRole,
      Phone: this.employee.Phone,
      Email: this.employee.Email,
    });
    this.modal.open();
  }
  resetMessageStrings()
  {     
    this.alertService.clear();  
  }
  onSubmit(formData: any) {
  this.resetMessageStrings();
    switch (this.dbops) {
      case CurdOperation.create:
        this.isUserNameExist = this.validatorService.userNameValidation(formData._value.UserName);       
        this.isEmpIDExist =this.validatorService.checkEmployeeIDAvailability(this.employees,formData._value.EmpID);
        this.doesPasswordmatch=this.validatorService.MatchPassword(formData._value.Password,formData._value.ConfirmPassword);
        if (this.isUserNameExist == false && this.isEmpIDExist == false&&this.doesPasswordmatch==true) {
          this.apiService.postRecord(Shared.URL_EXTENSION_EMP_POST, formData._value).subscribe(
            data => {
              if (data === 1) {
                 this.alertService.success("Data successfully added."); 
                this.getEmployeeRecords();
                this.isEmpIDExist = false;
                this.isUserNameExist = false;
              }
              else {
                 this.alertService.error("There is some issue in saving records, please contact to system administrator!")
              }
              this.modal.dismiss();
            },
            error => {
             
             this.alertService.error( error);
            }
          );
        }
        break;
      case CurdOperation.update:
        this.userFrm.controls["EmpID"].enable();
        this.apiService.putRecord(Shared.URL_EXTENSION_EMP_PUT_ID, formData._value.EmpID, formData._value).subscribe(
          data => {
            if (data == 1) {
           this.alertService.success("Data successfully updated.");
              this.getEmployeeRecords();
            }
            else {
              this.alertService.error("There is some issue in saving records, please contact to system administrator!")
            }

            this.modal.dismiss();
          },
          error => {
            this.alertService.error( error);
          }
        );

        break;
      case CurdOperation.delete:
        this.apiService.deleteRecord(Shared.URL_EXTENSION_EMP_DELETE_ID, formData._value.EmpID).subscribe(
          data => {
            if (data === 1) //Success
            {
             this.alertService.success( "Data successfully deleted.");
              this.getEmployeeRecords();
            }
            else {
               this.alertService.error("There is some issue in saving records, please contact to system administrator!")
            }
            this.modal.dismiss();
          },
          error => {
             this.alertService.error( error);
          }
        );
        break;
    }
  }
  SetControlsState(isEnable: boolean) {
    isEnable ? this.userFrm.enable() : this.userFrm.disable();
  }
}