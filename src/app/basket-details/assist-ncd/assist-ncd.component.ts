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
import { FormBuilder } from '@angular/forms';
// Service
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-assist-ncd',
  templateUrl: './assist-ncd.component.html',
  styleUrls: ['./assist-ncd.component.css'],
})
export class AssistNcdComponent implements OnInit {
  @Input() currentData: string;

  datePipeString: string;
  whatsAppURL = '/message/wa';
  basketCancelURL = '/admin/closebasket';
  basketDetailUpdateURL = '/admin/updatebasket';
  basketDetailURL = '/admin/dashboard/followup/details/';

  ncdList: Filter[] = [
    { option: '0', value: '0' },
    { option: '25', value: '25' },
    { option: '38.33', value: '38.33' },
    { option: '45', value: '45' },
    { option: '55', value: '55' },
  ];

  basketDetailForm = this._fb.group({
    ncd: ['0'],
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

  // LifeCycle Method
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
    const ncd = parseFloat(v.ncd);
    this.updateService(plateNo, ncd);
  }

  // Update Service Call
  updateService(p, n) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.basketDetailUpdateURL, {
        ncd: n,
        plateNo: p,
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
