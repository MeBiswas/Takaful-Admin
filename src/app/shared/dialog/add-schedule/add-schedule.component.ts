import { Component, OnInit, ViewChild } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Interface
import { Filter } from '../../../model/filter';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Regex Patterns
const pattern = /^[a-zA-Z0-9 ]*$/;

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css'],
})
export class AddScheduleComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn;
  getTemplateListURL: string = '/admin/templatelist';
  createScheduleURL: string = '/admin/createschedule';

  templateList: Filter[] = [];
  templateTypeList: Filter[] = [
    { value: 'SMS', option: 'SMS' },
    { value: 'Email', option: 'Email' },
  ];

  addScheduleForm = this._fb.group({
    type: ['', Validators.required],
    endDate: ['', Validators.required],
    startDate: ['', Validators.required],
    templateId: [null, Validators.required],
    scheduleName: ['', [Validators.required, Validators.pattern(pattern)]],
  });

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getTemplateList();
  }

  // Form Field Getter
  get type() {
    return this.addScheduleForm.get('type');
  }
  get end() {
    return this.addScheduleForm.get('endDate');
  }
  get start() {
    return this.addScheduleForm.get('startDate');
  }
  get template() {
    return this.addScheduleForm.get('templateId');
  }
  get schedule() {
    return this.addScheduleForm.get('scheduleName');
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
      : this.addSchedule(this.addScheduleForm.value);
  }

  // Add Schedule Service
  private addSchedule(v) {
    this._spin.show();
    this._admin.postApiWithAuth(this.createScheduleURL, v).subscribe(
      (res) => {
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
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this.closeModal();
  }

  // Close Modal Method
  closeModal(): void {
    this.addScheduleForm.setValue({
      type: [''],
      endDate: [''],
      startDate: [''],
      templateId: [null],
      scheduleName: [''],
    });
    this.closeBtn.nativeElement.click();
  }
}
