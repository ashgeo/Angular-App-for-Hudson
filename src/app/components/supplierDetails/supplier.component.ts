import { Injectable, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/apihandler/apihandler.service';
import { ISale } from '../services/data/sales/sales.data';
import { AlertService } from '../services/alert/alert.service';
import { Shared } from '../services/shared/shared.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CurdOperation } from '../services/curdEnum/curdEnum.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ValidatorService } from '../services/validator/validator.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { ISupplier } from '../services/data/supplier/supplier.data';
@Component({
  moduleId: module.id,
  selector: 'supplier',
  templateUrl: 'supplier.component.html'
})

export class SupplierComponent {
  @ViewChild('modal') modal: ModalComponent;
  Date: any;
  options: DatePickerOptions;
  suppliers: ISupplier[];
  supplier: ISupplier;
  indLoading: boolean = false;
  supplierForm: FormGroup;
  dbops: CurdOperation;
  modalTitle: string;
  modalBtnTitle: string;
  errorString: string;
  isSupplierIDExist: boolean = false;
  isSupplierPaidDateExist: boolean = false;
  constructor(private apiService: ApiService, private alertService: AlertService, private formBuilder: FormBuilder,
    private validatorService: ValidatorService) {
    this.options = new DatePickerOptions();
  }
  ngOnInit() {
    this.supplierForm = this.formBuilder.group({
      SupplierDetailsID: [''],
      Date: ['', Validators.required],
      SupplierName: ['', Validators.required],
      TotalAmount: ['', Validators.required],
      AmountPaid:  ['', Validators.required],
      AmountDue:  ['', Validators.required],
      });
    this.getSupplierRecords();
  }
  getSupplierRecords() {
    this.apiService.getRecords(Shared.URL_EXTENSION_SUPPLIER_GET) 
    .subscribe(
    (data: any) => {
      this.suppliers = this.validatorService.fixDate(data);
    }, error => this.alertService.error(<any>error));
  }
  resetMessageStrings() {
    this.alertService.clear();
  }
  addSupplierRecord() {
    this.resetMessageStrings();
    this.dbops = CurdOperation.create;
    this.SetControlsState(true);
    this.modalTitle = 'Add New Sales';
    this.modalBtnTitle = 'Add';
    this.supplierForm.reset();
    this.modal.open();
    this.supplierForm.controls['SupplierDetailsID'].disable();
  }
  editSupplierRecord(id: number) {

    this.resetMessageStrings();
    this.dbops = CurdOperation.update;
    this.SetControlsState(true);
    this.modalTitle = 'Edit Supplier';
    this.modalBtnTitle = 'Update';
    this.supplier = this.suppliers.filter(x => x.SupplierDetailsID === id)[0];
    this.supplierForm.patchValue({
      SupplierDetailsID: this.supplier.SupplierDetailsID,
      Date: this.supplier.Date,
      SupplierName: this.supplier.SupplierName,
      TotalAmount: this.supplier.TotalAmount,
      AmountPaid: this.supplier.AmountPaid,
      AmountDue: this.supplier.AmountDue,
    });
    this.modal.open();
    this.supplierForm.controls['SupplierDetailsID'].disable();
  }
  deleteSupplierRecord(id: number) {

    this.resetMessageStrings();
    this.dbops = CurdOperation.delete;
    this.SetControlsState(false);
    this.modalTitle = 'Confirm to Delete?';
    this.modalBtnTitle = 'Delete';
    this.supplier = this.suppliers.filter(x => x.SupplierDetailsID === id)[0];
    this.supplierForm.patchValue({
      SupplierDetailsID: this.supplier.SupplierDetailsID,
      Date: this.supplier.Date,
      SupplierName: this.supplier.SupplierName,
      TotalAmount: this.supplier.TotalAmount,
      AmountPaid: this.supplier.AmountPaid,
      AmountDue: this.supplier.AmountDue,
    });
    this.modal.open();
    this.supplierForm.controls['SupplierDetailsID'].disable();
  }
  onSubmit(formData: any) {
    this.resetMessageStrings();
    switch (this.dbops) {
      case CurdOperation.create:
        const  fixedErrorDate = this.validatorService.momentDatefix(formData._value.Date);
        formData._value.Date = fixedErrorDate;
        this.isSupplierPaidDateExist = this.validatorService.checkDateAvailability(this.suppliers, formData._value.Date);
        if (this.isSupplierPaidDateExist === false) {
          this.apiService.postRecord(Shared.URL_EXTENSION_SUPPLIER_POST, formData._value).subscribe(
            data => {
              if (data === 1) {
                this.alertService.success('Data successfully added.');
                this.getSupplierRecords();
                this.isSupplierIDExist = false;
                this.isSupplierIDExist = false;
              }else {
                this.alertService.error('There is some issue in saving records, please contact to system administrator!');
              }
              this.modal.dismiss();
            },
            error => {
              this.alertService.error(error);
            }
          );
        }
        break;
      case CurdOperation.update:
      this.supplierForm.controls['SupplierDetailsID'].enable();
      const fixedDate = this.validatorService.momentDatefix(formData._value.Date);
        formData._value.Date = fixedDate;
        this.apiService.putRecord(Shared.URL_EXTENSION_SUPPLIER_PUT_ID, formData._value.SupplierDetailsID, formData._value).subscribe(
          data => {
            if (data === 1) {
              this.alertService.success('Data successfully updated.');
              this.getSupplierRecords();
            }else {
              this.alertService.error('There is some issue in saving records, please contact to system administrator!');
            }
            this.modal.dismiss();
          },
          error => {
            this.alertService.error(error);
          }
        );
        break;
      case CurdOperation.delete:
      this.supplierForm.controls['SupplierDetailsID'].enable();
        this.apiService.deleteRecord(Shared.URL_EXTENSION_SUPPLIER_DELETE_ID, formData._value.SupplierDetailsID).subscribe(
          data => {
            if (data === 1)
            {
              this.alertService.success('Data successfully deleted.');
              this.getSupplierRecords();
           } else {
              this.alertService.error('There is some issue in saving records, please contact to system administrator!');
            }
            this.modal.dismiss();
          },
          error => {
            this.alertService.error(error);
          }
        );
        break;
    }
  }
  SetControlsState(isEnable: boolean) {
    isEnable ? this.supplierForm.enable() : this.supplierForm.disable();
  }
}
