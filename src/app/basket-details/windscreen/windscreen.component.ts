import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-windscreen',
  templateUrl: './windscreen.component.html',
  styleUrls: ['./windscreen.component.css'],
})
export class WindscreenComponent implements OnInit {
  @Input() currentData: string;
  phoneNo;
  email: string;
  datePipeString: string;
  actionList: Filter[] = [
    { value: 'topup', option: 'Topup' },
    { value: 'refund', option: 'Refund' },
  ];

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
    actionRemark: [''],
    customerName: [''],
    effectiveDate: [''],
    vehiclePlateNo: [''],
    action: ['', Validators.required],
    actionAmount: ['', [Validators.required, Validators.pattern(numeric)]],
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
  get amount() {
    return this.basketDetailForm.get('actionAmount');
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
        this.email = res.list[0].email;
        this.phoneNo = res.list[0].phoneNo;
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
      effectiveDate: this._datePipe.transform(
        new Date(d.effectiveDate),
        'dd MMM YYYY'
      ),
    };
    this.basketDetailForm.patchValue({ ...d });
  }

  // Form Submit Handler
  submitHandler(v) {
    !v
      ? this._toast.warning('Please fill all required fields')
      : this.updateHandler();
  }

  // Update Form Handler
  updateHandler() {
    console.log('Update Handler Method');
  }

  // Reload Handler
  reloadHandler() {
    window.location.reload();
  }
}
