import { Component, Input, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Pipe
import { DatePipe } from '@angular/common';
// Form
import { FormBuilder } from '@angular/forms';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Service
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-assist-market',
  templateUrl: './assist-market.component.html',
  styleUrls: ['./assist-market.component.css'],
})
export class AssistMarketComponent implements OnInit {
  @Input() currentData: string;

  datePipeString: string;
  whatsAppURL = '/message/wa';
  basketCancelURL = '/admin/closebasket';
  basketDetailUpdateURL = '/admin/updatebasket';
  basketDetailURL = '/admin/dashboard/followup/details/';

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
    marketValue: [''],
    customerName: [''],
    effectiveDate: [''],
    vehiclePlateNo: [''],
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
    this._admin.getApiWithAuth(u).subscribe((res) => {
      this.assignData(res.list[0]);
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

  // Whatsapp Call Service
  whatsAppCall(v) {
    this._admin
      .postApiWithAuth(this.whatsAppURL, {
        plateNo: v,
      })
      .subscribe((res) => {
        if (res.status.code === 0) {
          this._toast.success(res.status.message);
        } else if (res.status.code === 401) {
          this._router.navigate(['/auth/login']);
          this._toast.warning(res.status.message);
        } else {
          this._toast.error('Oops! Something went wrong.');
        }
        res ? this._spin.hide() : null;
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
    const marketValue = parseFloat(v.marketValue);

    marketValue
      ? this.updateService(plateNo, marketValue)
      : this._toast.warning('Please fill all required fields');
  }

  // Update Service Call
  updateService(p, mV) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.basketDetailUpdateURL, {
        plateNo: p,
        marketValue: mV,
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
