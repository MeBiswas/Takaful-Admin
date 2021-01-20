import { Component, OnInit, Input, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Email Regex
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input() data;
  @ViewChild('closeBtn') closeBtn;

  roles = [];
  roleListURL = '/security/rolelist';
  updateUserURL = '/security/updateuser';

  editUserForm = this._fb.group({
    role: ['', Validators.required],
    userId: ['', Validators.required],
    userName: ['', Validators.required],
    department: ['', Validators.required],
    password: ['', [Validators.minLength(8)]],
    repeatPassword: ['', [Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
  });

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService
  ) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getRoleList();
  }

  // LifeCycle Method
  ngOnChanges() {
    this.editUserForm.patchValue({ ...this.data });
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

  // Submit Method
  onSubmit(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.editUser(this.editUserForm.value);
  }

  // Edit User Service
  private editUser(d) {
    this._admin.postApiWithAuth(this.updateUserURL, d).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this._toast.success('User updated successfully');
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          this._toast.warning(res.status.message);
        }
      },
      (err) => {
        // console.log('Edit User Service Response', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this.closeModal();
  }

  // Close Modal Method
  closeModal(): void {
    this.editUserForm.setValue({
      role: '',
      email: '',
      userId: '',
      password: '',
      userName: '',
      department: '',
      repeatPassword: '',
    });
    this.closeBtn.nativeElement.click();
  }
}
