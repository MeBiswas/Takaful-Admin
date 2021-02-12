import {
  Input,
  OnInit,
  Output,
  Component,
  OnChanges,
  EventEmitter,
} from '@angular/core';
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

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css'],
})
export class MarketingComponent implements OnInit, OnChanges {
  @Input() currentData: string;
  @Output() userData = new EventEmitter<any>();

  datePipeString: string;
  updateDetailURL = '/admin/marketing/update';
  basketDetailURL = '/admin/marketing/details/';

  paymentMethodList: Filter[] = [
    { option: 'Online Banking', value: 'Online Banking' },
  ];

  ncdList: Filter[] = [
    { option: '25%', value: '25' },
    { option: '30%', value: '30' },
    { option: '38.33%', value: '38.33' },
    { option: '45%', value: '45' },
    { option: '55%', value: '55' },
  ];

  takafulTypeList: Filter[] = [
    { option: 'Etiqa Takaful', value: 'Etiqa Takaful' },
    { option: 'Malaysia Takaful', value: 'Malaysia Takaful' },
    { option: 'Takaful Ikhlas', value: 'Takaful Ikhlas' },
    { option: 'Zurich Takaful', value: 'Zurich Takaful' },
  ];

  callStatusList: Filter[] = [
    { option: 'Follow Up', value: 'Follow Up' },
    { option: 'No Answer', value: 'No Answer' },
    { option: 'Not Interested', value: 'Not Interested' },
    { option: 'Not In Service', value: 'Not In Service' },
    { option: 'Already Renew', value: 'Already Renew' },
    { option: 'Interested', value: 'Interested' },
  ];

  basketDetailForm = this._fb.group({
    nric: [null],
    model: [null],
    email: [null],
    chasis: [null],
    remarks: [null],
    phoneNo: [null],
    carMake: [null],
    carSpec: [null],
    assignTo: [null],
    carRegister: [null],
    expiredDate: [null],
    customerName: [null],
    customerStatus: [null],
    yearManufacture: [null],
    telemarketingStatus: [null],
    ncd: [null, Validators.required],
    action: [null, Validators.required],
    callStatus: [null, Validators.required],
    takafulType: [null, Validators.required],
    followUpDate: [null, Validators.required],
    paymentMethod: [null, Validators.required],
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

  // Form Field Getter
  get ncd() {
    return this.basketDetailForm.get('ncd');
  }
  get action() {
    return this.basketDetailForm.get('action');
  }
  get callStat() {
    return this.basketDetailForm.get('callStatus');
  }
  get takafulType() {
    return this.basketDetailForm.get('takafulType');
  }
  get followUpDate() {
    return this.basketDetailForm.get('followUpDate');
  }
  get paymentMethod() {
    return this.basketDetailForm.get('paymentMethod');
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
  private assignData(d) {
    d = {
      ...d,
      expiredDate: this._datePipe.transform(
        new Date(d.expiredDate),
        'dd/mm/YYYY'
      ),
      followUpDate: this._datePipe.transform(
        new Date(d.followUpDate),
        'yyyy-MM-dd'
      ),
    };
    this.basketDetailForm.patchValue({ ...d });
  }

  // Emitting Event
  sendUserData(e, p) {
    let data = { email: e, phoneNo: p };
    this.userData.emit(data);
  }

  // Form Reset Handler
  resetHandler() {
    this.basketDetailForm.reset();
    window.location.reload();
  }

  // Form Submit Handler
  submitHandler(v) {
    !v
      ? this._toast.warning('Please fill all required fields')
      : this.updateHandler();
  }

  private updateHandler() {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.updateDetailURL, {
        ncd: this.basketDetailForm.value.ncd,
        action: this.basketDetailForm.value.action,
        remarks: this.basketDetailForm.value.remarks,
        plateNo: this.basketDetailForm.value.carRegister,
        callStatus: this.basketDetailForm.value.callStatus,
        takafulType: this.basketDetailForm.value.takafulType,
        followUpDate: this.basketDetailForm.value.followUpDate,
        paymentMethod: this.basketDetailForm.value.paymentMethod,
      })
      .subscribe(
        (res) => {
          res ? this._spin.hide() : null;
          res.status.code === 0
            ? this._toast.success(res.status.message)
            : this._toast.warning(res.status.message);
          setTimeout(() => {
            this.resetHandler();
          }, 1000);
        },
        (err) => {
          err ? this._spin.hide() : null;
          this._toast.error('Oops! Something went wrong.');
        }
      );
  }
}
