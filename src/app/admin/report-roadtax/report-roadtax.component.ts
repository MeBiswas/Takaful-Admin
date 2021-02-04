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
const pattern = /[A-Z]{3}\s[0-9]{4}/;

@Component({
  selector: 'app-report-roadtax',
  templateUrl: './report-roadtax.component.html',
  styleUrls: ['./report-roadtax.component.css'],
})
export class ReportRoadtaxComponent implements OnInit {
  reportDetail = null;
  actionSelector: string;
  reportRoadTaxURL = '/admin/reportroadtax/';

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
    customerName: [null],
    refundRemark: [null],
    effectiveDate: [null],
    vehiclePlateNo: [null],
    yearManufacture: [null],
    blacklistedRemark: [null],
    status: [null, Validators.required],
    action: [null, Validators.required],
    topupAmount: [null, Validators.required],
    refundAmount: [null, Validators.required],
    blacklistedAmount: [null, Validators.required],
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
      .getApiWithAuth(this.reportRoadTaxURL + this.searchForm.value.search)
      .subscribe(
        (res) => {
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
        },
        (err) => {
          err ? this._spin.hide() : null;
          this._toast.error('Oops! Something went wrong.');
        }
      );
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
    if (e === 'Reund') {
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
      : this.submitReport();
  }

  // Submit Service Handler
  private submitReport() {
    console.log('ethe aa', this.reportDetailForm.value.status);
  }

  // Form Reset Handler
  resetHandler() {
    this.reportDetailForm.reset();
    window.location.reload();
  }
}
