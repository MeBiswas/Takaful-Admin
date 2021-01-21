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
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css'],
})
export class MarketingComponent implements OnInit {
  @Input() currentData: string;
  datePipeString: string;

  basketDetailURL = '/admin/marketing/details/';

  basketDetailForm = this._fb.group({
    email: [null],
    action: [null],
    phoneNo: [null],
    assignTo: [null],
    callStatus: [null],
    carRegister: [null],
    expiredDate: [null],
    followUpDate: [null],
    customerStatus: [null],
    telemarketingStatus: [null],
  });

  constructor(
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
    this._admin.getApiWithAuth(u).subscribe(
      (res) => {
        this.assignData(res);
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
      expiredDate: this._datePipe.transform(
        new Date(d.expiredDate),
        'dd/mm/YYYY'
      ),
      followUpDate: this._datePipe.transform(
        new Date(d.followUpDate),
        'dd/mm/YYYY'
      ),
    };
    this.basketDetailForm.patchValue({ ...d });
  }
}
