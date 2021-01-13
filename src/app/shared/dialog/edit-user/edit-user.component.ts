import { Component, OnInit, Input } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Custom Validators
import { PasswordValidator } from '../../../validators/password.validator';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input() data;
  updateUserURL = '/security/addupdateuser';

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

  ngOnInit(): void {}

  ngOnChanges() {
    this.editUserForm.patchValue({ ...this.data });
  }

  onSubmit() {
    this._admin
      .postApiWithAuth(this.updateUserURL, this.editUserForm.value)
      .subscribe(
        (res) => {
          this._toast.success(res.status.message);
        },
        (err) => {
          console.log('Edit User Service Response', err);
          this._toast.error('Oops! Something went wrong.');
        }
      );
    this.closeModal();
  }

  closeModal() {
    this.editUserForm.setValue({
      role: '',
      email: '',
      userId: '',
      password: '',
      userName: '',
      department: '',
      repeatPassword: '',
    });
    console.log('Modal Close');
  }
}
