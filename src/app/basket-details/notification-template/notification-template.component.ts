import { Component, Input, OnInit, OnChanges } from '@angular/core';
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
  selector: 'app-notification-template',
  templateUrl: './notification-template.component.html',
  styleUrls: ['./notification-template.component.css'],
})
export class NotificationTemplateComponent implements OnInit, OnChanges {
  @Input() currentData;
  updateTemplateURL: string = '/admin/updatetemplate';

  templateTypeList: Filter[] = [
    { value: 'SMS', option: 'SMS' },
    { value: 'Email', option: 'Email' },
  ];

  basketDetailForm = this._fb.group({
    message: [''],
    templateId: [null],
    type: ['', Validators.required],
    template: ['', [Validators.required, Validators.pattern(pattern)]],
  });

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // LifeCycle Method
  ngOnChanges() {
    this.basketDetailForm.patchValue({ ...this.currentData });
  }

  // Form Field Getter
  get template() {
    return this.basketDetailForm.get('template');
  }
  get type() {
    return this.basketDetailForm.get('type');
  }

  // Form Submit Handler
  submitHandler(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.updateTemplate(this.basketDetailForm.value);
  }

  // Update Service Handler
  private updateTemplate(d) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.updateTemplateURL, {
        template: d,
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

  // Reload Handler
  reloadHandler() {
    window.location.reload();
  }
}
