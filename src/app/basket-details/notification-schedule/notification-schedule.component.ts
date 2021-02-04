import { Component, OnInit, Input } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Interface
import { Filter } from './../../model/filter';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from './../../services/admin/admin.service';
// Regex Patterns
const pattern = /^[a-zA-Z0-9 ]*$/;

@Component({
  selector: 'app-notification-schedule',
  templateUrl: './notification-schedule.component.html',
  styleUrls: ['./notification-schedule.component.css'],
})
export class NotificationScheduleComponent implements OnInit {
  @Input() currentData;
  getTemplateListURL: string = '/admin/templatelist';
  updateScheduleURL: string = '/admin/updateschedule';

  templateList: Filter[] = [];
  templateTypeList: Filter[] = [
    { value: 'SMS', option: 'SMS' },
    { value: 'Email', option: 'Email' },
  ];

  basketDetailForm = this._fb.group({
    scheduleId: [null],
    type: ['', Validators.required],
    endDate: ['', Validators.required],
    startDate: ['', Validators.required],
    templateId: [null, Validators.required],
    schedule: ['', [Validators.required, Validators.pattern(pattern)]],
  });

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getTemplateList();
  }

  // LifeCycle Method
  ngOnChanges() {
    this.basketDetailForm.patchValue({ ...this.currentData });
  }

  // Form Field Getter
  get type() {
    return this.basketDetailForm.get('type');
  }
  get end() {
    return this.basketDetailForm.get('endDate');
  }
  get schedule() {
    return this.basketDetailForm.get('schedule');
  }
  get start() {
    return this.basketDetailForm.get('startDate');
  }
  get template() {
    return this.basketDetailForm.get('templateId');
  }

  // Setting Template List
  private setTemplateList(l) {
    l.forEach((item) => {
      this.templateList.push({ value: item.templateId, option: item.template });
    });
  }

  // Getting Template List
  private getTemplateList() {
    this._spin.show();
    this._admin.getApiWithAuth(this.getTemplateListURL).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this.setTemplateList(res.list);
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

  // Submit Handler
  submitHandler(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.updateSchedule(this.basketDetailForm.value);
  }

  // Update Service Handler
  private updateSchedule(d) {
    this._spin.show();
    this._admin.postApiWithAuth(this.updateScheduleURL, d).subscribe(
      (res) => {
        console.log('Response', res);
        // if (res.status.code === 0) {
        //   this._toast.success(res.status.message);
        //   setTimeout(function () {
        //     window.location.reload();
        //   }, 1000);
        // } else if (res.status.code === 401) {
        //   this._router.navigate(['/auth/login']);
        //   this._toast.warning(res.status.message);
        // } else {
        //   this._toast.error('Oops! Something went wrong.');
        // }
        res ? this._spin.hide() : null;
      },
      (err) => {
        console.log('Error', err);
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }

  // Reload Handler
  reloadHandler() {
    window.location.reload();
  }
}
