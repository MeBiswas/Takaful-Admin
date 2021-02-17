import { Input, OnInit, Component, ViewChild, OnChanges } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Forms
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Pattern
const msgPattern = /^[a-zA-Z0-9_ ]*$/;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css'],
})
export class SmsComponent implements OnInit, OnChanges {
  @Input() data;
  @ViewChild('closeBtn') closeBtn;

  today: number = Date.now();
  smsURL: string = '/message/sms';

  smsForm = this._fb.group({
    phoneNo: ['', Validators.required],
    message: ['', [Validators.required, Validators.pattern(msgPattern)]],
  });

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // LifeCycle Method
  ngOnChanges() {
    this.smsForm.patchValue({ ...this.data });
  }

  // Form Field Getter
  get msg() {
    return this.smsForm.get('message');
  }
  get phn() {
    return this.smsForm.get('phoneNo');
  }

  // Submit Handler
  onSubmit(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.sendSMS(this.smsForm.value);
  }

  // Service Handler
  private sendSMS(v) {
    this._spin.show();
    this._admin.postApiWithAuth(this.smsURL, v).subscribe((res) => {
      res ? this._spin.hide() : null;
      if (res.status.code === 0) {
        this._toast.success(res.status.message);
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        this._toast.warning(res.status.message);
      }
    });
    this.closeModal();
  }

  // Close Modal Method
  closeModal(): void {
    this.smsForm.setValue({
      phoneNo: [''],
      message: [''],
    });
    this.closeBtn.nativeElement.click();
  }
}
