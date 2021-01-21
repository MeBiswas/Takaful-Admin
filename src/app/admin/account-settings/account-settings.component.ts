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
// Regex Patterns
const alphaPattern = /^[a-zA-Z ]*$/;
const unamePattern = /^[a-zA-Z0-9_]*$/;
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
      roleName: ['', Validators.required],
      password: ['', Validators.minLength(8)],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      userId: ['', [Validators.required, Validators.pattern(unamePattern)]],
      userName: ['', [Validators.required, Validators.pattern(unamePattern)]],
      department: ['', [Validators.required, Validators.pattern(alphaPattern)]],
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

  // Form Field Getter
  get email() {
    return this.accountSettingForm.get('email');
  }
  get id() {
    return this.accountSettingForm.get('userId');
  }
  get name() {
    return this.accountSettingForm.get('userName');
  }
  get role() {
    return this.accountSettingForm.get('roleName');
  }
  get password() {
    return this.accountSettingForm.get('password');
  }
  get department() {
    return this.accountSettingForm.get('department');
  }
  get rPassword() {
    return this.accountSettingForm.get('repeatPassword');
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
