import { Component, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
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
  userData = null;
  roleListURL = '/security/rolelist';
  userUpdateURL = '/security/updateuser';
  userDetailURL = '/security/userdetails';
  userID = JSON.parse(sessionStorage.getItem('auth')).userId;

  accountSettingForm = this._fb.group(
    {
      roleId: [null],
      repeatPassword: [''],
      email: ['', Validators.required],
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      roleName: ['', Validators.required],
      department: ['', Validators.required],
      password: ['', Validators.minLength(8)],
    },
    { validator: PasswordValidator }
  );

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.userDetail();
    this.getRoleList();
  }

  // User Detail Service
  private userDetail() {
    this._admin
      .postApiWithAuth(this.userDetailURL, {
        userId: this.userID,
      })
      .subscribe(
        (res) => {
          this.accountSettingForm.patchValue({ ...res });
        },
        (err) => {
          this._toast.error('Oops! Something went wrong.');
        }
      );
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
  private updateSettings(d) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.userUpdateURL, { ...d, role: d.roleName })
      .subscribe(
        (res) => {
          this._toast.success('Updated Successfully');
          this._router.navigate(['/admin/dashboard']);
        },
        (err) => {
          this._toast.error('Oops! Something went wrong.');
        }
      );
    this._spin.hide();
  }

  // Cancel Handler
  cancelHandler() {
    this._router.navigate(['/admin/dashboard']);
  }
}
