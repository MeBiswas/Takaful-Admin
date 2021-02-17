import { Component, OnInit } from '@angular/core';
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
const pattern = /^[a-zA-Z0-9 ]*$/;

@Component({
  selector: 'app-report-roadtax',
  templateUrl: './report-roadtax.component.html',
  styleUrls: ['./report-roadtax.component.css'],
})
export class ReportRoadtaxComponent implements OnInit {
  reportDetail = null;
  actionSelector: string;
  basketCancelURL = '/admin/closebasket';
  reportRoadTaxURL = '/admin/reportroadtax/';
  basketDetailUpdateURL = '/admin/updatebasket';

  statusList: Filter[] = [
    { value: 'Topup', option: 'Topup' },
    { value: 'Refund', option: 'Refund' },
    { value: 'Blacklisted', option: 'Blacklisted' },
  ];

  searchForm = this._fb.group({
    search: [null, [Validators.required, Validators.pattern(pattern)]],
  });

  reportDetailForm = this._fb.group({
    nric: [null],
    email: [null],
    status: [null],
    chasis: [null],
    phoneNo: [null],
    carMake: [null],
    carSpec: [null],
    address1: [null],
    carModel: [null],
    coverage: [null],
    address2: [null],
    postcode: [null],
    coverType: [null],
    sumInsured: [null],
    topupRemark: [null],
    topupAmount: [null],
    customerName: [null],
    refundAmount: [null],
    refundRemark: [null],
    effectiveDate: [null],
    vehiclePlateNo: [null],
    yearManufacture: [null],
    blacklistedAmount: [null],
    blacklistedRemark: [null],
    action: [null, Validators.required],
  });

  constructor(
    private _router: Router,
    private _date: DatePipe,
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // Form Field Getter
  get search() {
    return this.searchForm.get('search');
  }
  get status() {
    return this.reportDetailForm.get('status');
  }
  get tAmount() {
    return this.reportDetailForm.get('topupAmount');
  }
  get rAmount() {
    return this.reportDetailForm.get('refundAmount');
  }
  get bAmount() {
    return this.reportDetailForm.get('blacklistedAmount');
  }

  // Form Submit Hander
  submitHandler(v) {
    !v
      ? this._toast.warning('Car Registeration Number is required')
      : this.detailService();
  }

  // Detail Service Handler
  private detailService() {
    this._spin.show();
    this._admin
      .getApiWithAuth(
        this.reportRoadTaxURL + this.searchForm.value.search.toUpperCase()
      )
      .subscribe((res) => {
        if (res.status.code === 0) {
          this.assignData(res.list[0]);
          this.actionSelector = res.list[0].action;
          this.reportDetail = res.list[0].vehiclePlateNo;
        } else if (res.status.code === 401) {
          this._router.navigate(['/auth/login']);
          this._toast.warning(res.status.message);
        } else {
          this._toast.error('Oops! Something went wrong.');
        }
        res ? this._spin.hide() : null;
      });
  }

  // Assigning default Data to Form
  private assignData(d) {
    d = {
      ...d,
      expiredDate: this._date.transform(
        new Date(d.effectiveDate),
        'dd MM YYYY'
      ),
    };
    this.reportDetailForm.patchValue({ ...d });
  }

  // On Action Selector Change
  onActionSelectorChanged(e) {
    this.actionSelector = e;
    if (e === 'Refund') {
      this.reportDetailForm.patchValue({
        topupRemark: null,
        topupAmount: null,
        blacklistedRemark: null,
        blacklistedAmount: null,
      });
    } else if (e === 'Topup') {
      this.reportDetailForm.patchValue({
        refundRemark: null,
        refundAmount: null,
        blacklistedRemark: null,
        blacklistedAmount: null,
      });
    } else if (e === 'Blacklisted') {
      this.reportDetailForm.patchValue({
        topupRemark: null,
        topupAmount: null,
        refundRemark: null,
        refundAmount: null,
      });
    }
  }

  // Report Form Submit Handler
  reportSubmitHandler(v) {
    !v
      ? this._toast.warning('Please fill all required fields')
      : this.reportHandler(this.reportDetailForm.value);
  }

  // Report Handler
  reportHandler(v) {
    let amount;
    let remarks;
    const action = v.action;
    const plateNo = v.vehiclePlateNo;

    if (v.topupAmount === null && v.refundAmount === null) {
      amount = parseFloat(v.blacklistedAmount);
    } else if (v.refundAmount === null && v.blacklistedAmount === null) {
      amount = parseFloat(v.topupAmount);
    } else {
      amount = parseFloat(v.refundAmount);
    }

    if (v.topupRemark === null && v.refundRemark === null) {
      remarks = v.blacklistedRemark;
    } else if (v.refundRemark === null && v.blacklistedRemark === null) {
      remarks = v.topupRemark;
    } else {
      remarks = v.refundRemark;
    }

    amount
      ? this.submitReport(plateNo, action, amount, remarks)
      : this._toast.warning('Please fill all required fields');
  }

  // Submit Service Handler
  private submitReport(p, a, amt, r) {
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
}
