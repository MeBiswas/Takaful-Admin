import { Component, OnInit } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Forms
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Custom Validators
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  roles = [];
  roleListURL = '/security/rolelist';

  accountSettingForm = this._fb.group(
    {
      repeatPassword: [''],
      role: ['', Validators.required],
      email: ['', Validators.required],
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      department: ['', Validators.required],
      password: ['', Validators.minLength(8)],
    },
    { validator: PasswordValidator }
  );

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getRoleList();
  }

  // Role List Service
  private getRoleList() {
    this._admin.getApiWithAuth(this.roleListURL).subscribe(
      (res) => {
        this.roles = [...res.roleList];
      },
      (err) => {
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }

  // Submit Handler
  onSubmit(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.updateSettings(this.accountSettingForm.value);
  }

  // Update Service
  updateSettings(d) {
    this._spin.show();
    console.log('Update Service Response', d);
    this._spin.hide();
  }
}
