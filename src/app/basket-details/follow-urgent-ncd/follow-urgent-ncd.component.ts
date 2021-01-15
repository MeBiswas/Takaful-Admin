import { Component, Input, OnInit } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Pipe
import { DatePipe } from '@angular/common';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-follow-urgent-ncd',
  templateUrl: './follow-urgent-ncd.component.html',
  styleUrls: ['./follow-urgent-ncd.component.css'],
})
export class FollowUrgentNcdComponent implements OnInit {
  @Input() currentData: string;
  datePipeString: string;

  basketDetailURL = '/admin/dashboard/followup/details/';

  basketDetailForm = this._fb.group({
    remarks: [''],
    topupRemark: [''],
    refundRemark: [''],
    nric: ['', Validators.required],
    email: ['', Validators.required],
    status: ['', Validators.required],
    phoneNo: ['', Validators.required],
    coverage: ['', Validators.required],
    carModel: ['', Validators.required],
    postcode: ['', Validators.required],
    address1: ['', Validators.required],
    address2: ['', Validators.required],
    coverType: ['', Validators.required],
    principal: ['', Validators.required],
    sumInsured: ['', Validators.required],
    topupAmount: ['', Validators.required],
    customerName: ['', Validators.required],
    refundAmount: ['', Validators.required],
    effectiveDate: ['', Validators.required],
    vehiclePlateNo: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.onDataChange(this.currentData);
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
    this._admin.getApiWithAuth(u).subscribe(
      (res) => {
        this.assignData(res.list[0]);
      },
      (err) => {
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this._spin.hide();
  }

  // Assigning default Data to Form
  assignData(d) {
    d = {
      ...d,
      effectiveDate: this._datePipe.transform(
        new Date(d.effectiveDate),
        'yyyy-MM-dd'
      ),
    };
    this.basketDetailForm.patchValue({ ...d });
  }
}
