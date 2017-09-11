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
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'sales',
  templateUrl: 'sales.component.html'
})

export class SalesComponent {
  @ViewChild('modal') modal: ModalComponent;
  Date: any;
  options: DatePickerOptions;
  sales: ISale[];
  sale: ISale;
  indLoading: boolean = false;
  salesForm: FormGroup;
  dbops: CurdOperation;
  modalTitle: string;
  modalBtnTitle: string;
  errorString: string;
  isSaleIDExist: boolean = false;
  isSaleDateExist: boolean = false;
  constructor(private apiService: ApiService, private alertService: AlertService, private formBuilder: FormBuilder, 
    private validatorService: ValidatorService) {
    this.options = new DatePickerOptions();
  }
  ngOnInit() {
    this.salesForm = this.formBuilder.group({
      SaleID: [''],
      Date: ['', Validators.required],
      FtposAmount: ['', Validators.required],
      CashAmount: ['', Validators.required],
      BlueBoxAmount: [''],
      CashLeft: ['', Validators.required],
      TotalSale: ['', Validators.required],
    });

    this.getSaleRecords();
  }
  getSaleRecords() {
    this.apiService.getRecords(Shared.URL_EXTENSION_SALES_GET) // note, removed this.countries = 
      .subscribe(
      (data: any) => {
        // this.sales = data;
        this.sales = this.validatorService.fixDate(data);
      }, error => this.alertService.error(<any>error));
  }

  getSaleRecord(id: number) {
    this.apiService.getRecord(Shared.URL_EXTENSION_SALES_GET_ID + id, id) //
      .subscribe(
      (data: any) => {
        this.sale = data;
      });
  }
  resetMessageStrings() {
    this.alertService.clear();
  }
  addSaleRecord() {
    this.resetMessageStrings();
    this.dbops = CurdOperation.create;
    this.SetControlsState(true);
    this.modalTitle = 'Add New Sales';
    this.modalBtnTitle = 'Add';
    this.salesForm.reset();
    this.modal.open();
    this.salesForm.controls['BlueBoxAmount'].disable();
    this.salesForm.controls['SaleID'].disable();
  }
  editEmployeeRecord(id: number) {

    this.resetMessageStrings();
    this.dbops = CurdOperation.update;
    this.SetControlsState(true);
    this.modalTitle = 'Edit sale';
    this.modalBtnTitle = 'Update';
    this.sale = this.sales.filter(x => x.SaleID == id)[0];
    this.salesForm.patchValue({
      SaleID: this.sale.SaleID,
      Date: this.sale.Date,
      FtposAmount: this.sale.FtposAmount,
      CashAmount: this.sale.CashAmount,
      CashLeft: this.sale.CashLeft,
      TotalSale: this.sale.TotalSale,
    });
    this.modal.open();
    this.salesForm.controls['SaleID'].disable();
    this.salesForm.controls['BlueBoxAmount'].disable();
  }
  deleteEmployeeRecord(id: number) {

    this.resetMessageStrings();
    this.dbops = CurdOperation.delete;
    this.SetControlsState(false);
    this.modalTitle = 'Confirm to Delete?';
    this.modalBtnTitle = 'Delete';
    this.sale = this.sales.filter(x => x.SaleID == id)[0];
    this.salesForm.patchValue({
      SaleID: this.sale.SaleID,
      Date: this.sale.Date,
      FtposAmount: this.sale.FtposAmount,
      CashAmount: this.sale.CashAmount,
      CashLeft: this.sale.CashLeft,
      TotalSale: this.sale.TotalSale,
    });
    this.modal.open();
    this.salesForm.controls['SaleID'].disable();
  }
  
  onSubmit(formData: any) {
    this.resetMessageStrings();
    switch (this.dbops) {
      case CurdOperation.create:
        const fixedDate = this.validatorService.momentDatefix(formData._value.Date)
        formData._value.Date = fixedDate;
        this.isSaleDateExist = this.validatorService.checkDateAvailability(this.sales, formData._value.Date);
        if (this.isSaleDateExist === false) {
          this.apiService.postRecord(Shared.URL_EXTENSION_SALES_POST, formData._value).subscribe(
            data => {
              if (data === 1) {
                this.alertService.success('Data successfully added.');
                this.getSaleRecords();
                this.isSaleIDExist = false;
                this.isSaleIDExist = false;
              }
              else {
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
        this.salesForm.controls['BlueBoxAmount'].enable();
        this.salesForm.controls['SaleID'].enable();
        var fixedErrorDate = this.validatorService.momentDatefix(formData._value.Date);
        formData._value.Date = fixedErrorDate;
        this.apiService.putRecord(Shared.URL_EXTENSION_SALES_PUT_ID, formData._value.SaleID, formData._value).subscribe(
          data => {
            if (data == 1) {
              this.alertService.success('Data successfully updated.');
              this.getSaleRecords();
            }
            else {
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
        this.salesForm.controls['SaleID'].disable();
        this.apiService.deleteRecord(Shared.URL_EXTENSION_SALES_DELETE_ID, formData._value.SaleID).subscribe(
          data => {
            if (data == 1) //Success
            {
              this.alertService.success('Data successfully deleted.');
              this.getSaleRecords();
            }
            else {
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
    isEnable ? this.salesForm.enable() : this.salesForm.disable();
  }
}
