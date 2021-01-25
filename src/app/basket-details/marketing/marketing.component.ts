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

  callStatusList = [
    { option: 'No Answer', value: 'No Answer' },
    { option: 'Not Interested', value: 'Not Interested' },
    { option: 'Not In Service', value: 'Not In Service' },
    { option: 'Already Renew', value: 'Already Renew' },
    { option: 'Interested', value: 'Interested' },
  ];

  takafulTypeList = [
    { option: 'Etiqa Takaful', value: 'Etiqa Takaful' },
    { option: 'Malaysia Takaful', value: 'Malaysia Takaful' },
    { option: 'Takaful Ikhlas', value: 'Takaful Ikhlas' },
    { option: 'Zurich Takaful', value: 'Zurich Takaful' },
  ];

  paymentMethodList = [{ option: 'Online Banking', value: 'Online Banking' }];

  ncdList = [
    { option: '25%', value: '25%' },
    { option: '30%', value: '30%' },
    { option: '38.33%', value: '38.33%' },
    { option: '45%', value: '45%' },
    { option: '55%', value: '55%' },
  ];

  basketDetailURL = '/admin/marketing/details/';

  basketDetailForm = this._fb.group({
    nric: [null],
    model: [null],
    email: [null],
    chasis: [null],
    action: [null],
    phoneNo: [null],
    carMake: [null],
    carSpec: [null],
    assignTo: [null],
    callStatus: [null],
    carRegister: [null],
    expiredDate: [null],
    followUpDate: [null],
    customerName: [null],
    customerStatus: [null],
    yearManufacture: [null],
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
        res ? this._spin.hide() : null;
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
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
