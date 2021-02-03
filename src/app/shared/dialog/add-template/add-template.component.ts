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
const pattern = /^[a-zA-Z]*$/;

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css'],
})
export class AddTemplateComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn;
  templateType: string = 'Email';
  addTemplateURL: string = '/admin/createtemplate';

  addTemplateForm = this._fb.group({
    message: [''],
    type: ['', Validators.required],
    template: ['', [Validators.required, Validators.pattern(pattern)]],
  });

  templateTypeList: Filter[] = [
    { value: 'SMS', option: 'SMS' },
    { value: 'Email', option: 'Email' },
  ];
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // Form Field Getter
  get template() {
    return this.addTemplateForm.get('template');
  }
  get type() {
    return this.addTemplateForm.get('type');
  }

  // Submit Handler
  submitHandler(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.addTemplate(this.addTemplateForm.value);
  }

  // Add Template Service
  private addTemplate(v) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.addTemplateURL, {
        template: v,
      })
      .subscribe(
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
    this.addTemplateForm.setValue({
      type: [''],
      message: [''],
      template: [''],
    });
    this.closeBtn.nativeElement.click();
  }
}
