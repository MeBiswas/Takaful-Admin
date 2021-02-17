import { Component, OnInit, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Forms
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Custom Validators
import { PasswordValidator } from '../../../validators/password.validator';
// Regex Patterns
const alphaPattern = /^[a-zA-Z ]*$/;
const unamePattern = /^[a-zA-Z0-9_ ]*$/;
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn;

  roles = [];
  addUserURL = '/security/adduser';
  roleListURL = '/security/rolelist';

  addUserForm = this._fb.group(
    {
      role: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      userId: ['', [Validators.required, Validators.pattern(unamePattern)]],
      userName: ['', [Validators.required, Validators.pattern(unamePattern)]],
      department: ['', [Validators.required, Validators.pattern(alphaPattern)]],
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

  // Form Field Getter
  get name() {
    return this.addUserForm.get('userName');
  }
  get id() {
    return this.addUserForm.get('userId');
  }
  get email() {
    return this.addUserForm.get('email');
  }
  get role() {
    return this.addUserForm.get('role');
  }
  get department() {
    return this.addUserForm.get('department');
  }
  get password() {
    return this.addUserForm.get('password');
  }
  get rPassword() {
    return this.addUserForm.get('repeatPassword');
  }

  // Role List Service
  private getRoleList() {
    this._spin.show();
    this._admin.getApiWithAuth(this.roleListURL).subscribe((res) => {
      this.roles = [...res.roleList];
      res ? this._spin.hide() : null;
    });
  }

  // Submit Handler
  onSubmit(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.addUser(this.addUserForm.value);
  }

  // Add User Service
  private addUser(d) {
    this._spin.show();
    this._admin.postApiWithAuth(this.addUserURL, d).subscribe((res) => {
      if (res.status.code === 0) {
        this._toast.success(res.status.message);
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        this._toast.warning(res.status.message);
      }
      res ? this._spin.hide() : null;
    });
    this.closeModal();
  }

  // Close Modal Method
  closeModal(): void {
    this.addUserForm.setValue({
      role: '',
      email: '',
      userId: '',
      userName: '',
      password: '',
      department: '',
      repeatPassword: '',
    });
    this.closeBtn.nativeElement.click();
  }
}
