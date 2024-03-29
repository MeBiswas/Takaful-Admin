import { Component, Input, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Pipe
import { DatePipe } from '@angular/common';
// Interface
import { Filter } from '../../model/filter';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Pattern
const numeric = /^[0-9]*$/;

@Component({
  selector: 'app-urgent-ncd',
  templateUrl: './urgent-ncd.component.html',
  styleUrls: ['./urgent-ncd.component.css'],
})
export class UrgentNcdComponent implements OnInit {
  @Input() currentData: string;

  datePipeString: string;
  actionSelector: string;
  basketCancelURL = '/admin/closebasket';
  basketDetailUpdateURL = '/admin/updatebasket';
  basketDetailURL = '/admin/dashboard/followup/details/';

  actionList: Filter[] = [
    { value: 'Topup', option: 'Topup' },
    { value: 'Refund', option: 'Refund' },
  ];

  basketDetailForm = this._fb.group({
    nric: [''],
    email: [''],
    status: [''],
    remarks: [''],
    phoneNo: [''],
    coverage: [''],
    carModel: [''],
    postcode: [''],
    address1: [''],
    address2: [''],
    coverType: [''],
    principal: [''],
    sumInsured: [''],
    topupRemark: [''],
    refundRemark: [''],
    customerName: [''],
    effectiveDate: [''],
    vehiclePlateNo: [''],
    action: ['', Validators.required],
    topupAmount: ['', Validators.pattern(numeric)],
    refundAmount: ['', Validators.pattern(numeric)],
  });

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // LifeCycle Method
  ngOnChanges() {
    this.onDataChange(this.currentData);
  }

  // Form Field Getter
  get refundAmount() {
    return this.basketDetailForm.get('refundAmount');
  }
  get topupAmount() {
    return this.basketDetailForm.get('topupAmount');
  }

  // Modifying API URL As Per Parent Input
  private onDataChange(v) {
    let url = this.basketDetailURL;
    url = url + v;
    this.getDetailData(url);
  }

  // Service Call
  private getDetailData(u: string) {
    this._spin.show();
    this._admin.getApiWithAuth(u).subscribe((res) => {
      this.assignData(res.list[0]);
      this.actionSelector = res.list[0].action;
      res ? this._spin.hide() : null;
    });
  }

  // Assigning default Data to Form
  assignData(d) {
    d = {
      ...d,
      effectiveDate: this._datePipe.transform(
        new Date(d.effectiveDate),
        'dd MMM YYYY'
      ),
    };
    this.basketDetailForm.patchValue({ ...d });
  }

  // On Action Selector Change
  onActionSelectorChanged(e) {
    this.actionSelector = e;
    e === 'Refund'
      ? this.basketDetailForm.patchValue({
          topupRemark: null,
          topupAmount: '',
        })
      : this.basketDetailForm.patchValue({
          refundRemark: null,
          refundAmount: '',
        });
  }

  // Form Submit Handler
  submitHandler(v) {
    !v
      ? this._toast.warning('Please fill all required fields')
      : this.updateHandler(this.basketDetailForm.value);
  }

  // Update Form Handler
  updateHandler(v) {
    const plateNo = v.vehiclePlateNo;
    const action = v.action;
    const amount = v.topupAmount
      ? parseFloat(v.topupAmount)
      : parseFloat(v.refundAmount);
    const remarks = v.topupRemark ? v.topupRemark : v.refundRemark;
    amount
      ? this.updateService(plateNo, action, amount, remarks)
      : this._toast.warning('Please fill all required fields');
  }

  // Update Service Call
  updateService(p, a, amt, r) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.basketDetailUpdateURL, {
        plateNo: p,
        action: a,
        amount: amt,
        remarks: r,
      })
      .subscribe((res) => {
        if (res.status.code === 0) {
          this._toast.success(res.status.message);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else if (res.status.code === 401) {
          this._router.navigate(['/auth/login']);
          this._toast.warning(res.status.message);
        } else {
          this._toast.error('Oops! Something went wrong.');
        }
        res ? this._spin.hide() : null;
      });
  }

  // Cancel Handler Service
  cancelService(v) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.basketCancelURL, {
        plateNo: v,
      })
      .subscribe((res) => {
        if (res.status.code === 0) {
          this._toast.success(res.status.message);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else if (res.status.code === 401) {
          this._router.navigate(['/auth/login']);
          this._toast.warning(res.status.message);
        } else {
          this._toast.error('Oops! Something went wrong.');
        }
        res ? this._spin.hide() : null;
      });
  }

  // Redirect to Link
  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
