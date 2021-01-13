import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Forms
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Custom Validators
import { PasswordValidator } from '../../../validators/password.validator';
// Email Regex
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  mySubscription: any;

  addUserForm = this._fb.group(
    {
      role: ['', Validators.required],
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      department: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    },
    { validator: PasswordValidator }
  );

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRoleList();
  }

  getRoleList() {
    this._admin.getApiWithAuth(this.roleListURL).subscribe(
      (res) => {
        this.roles = [...res.roleList];
      },
      (err) => {
        // console.log('Add User Service Response', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }

  onSubmit(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.addUser(this.addUserForm.value);
  }

  private addUser(d) {
    this._admin.postApiWithAuth(this.addUserURL, d).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this._toast.success(res.status.message);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          this._toast.warning(res.status.message);
        }
      },
      (err) => {
        // console.log('Add User Service Response', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this.closeModal();
  }

  closeModal(): void {
    this.addUserForm.setValue({
      role: '',
      email: '',
      userId: '',
      userName: '',
      department: '',
      password: '',
      repeatPassword: '',
    });
    this.closeBtn.nativeElement.click();
  }
}
