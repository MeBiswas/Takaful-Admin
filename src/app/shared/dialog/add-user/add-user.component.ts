import { Component, OnInit, ViewChild } from '@angular/core';
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
      : this.addUser(this.addUserForm.value);
  }

  // Add User Service
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
        this._toast.error('Oops! Something went wrong.');
      }
    );
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
