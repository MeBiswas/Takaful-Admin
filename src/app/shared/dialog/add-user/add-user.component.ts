import { Component, OnInit } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Forms
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Validators
import { PasswordValidator } from '../../../validators/password.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addUserURL = '/security/addupdateuser';

  addUserForm = this._fb.group(
    {
      role: ['', Validators.required],
      email: ['', Validators.required],
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      department: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    },
    { validator: PasswordValidator }
  );

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.addUserForm.get('userName').pristine) {
      this._toast.error('Please enter userName');
    } else if (this.addUserForm.get('userId').pristine) {
      this._toast.error('Please enter userId');
    } else if (this.addUserForm.get('email').pristine) {
      this._toast.error('Please enter email');
    } else if (this.addUserForm.get('role').pristine) {
      this._toast.error('Please enter role');
    } else if (this.addUserForm.get('department').pristine) {
      this._toast.error('Please enter department');
    } else if (this.addUserForm.get('newPassword').pristine) {
      this._toast.error('Please enter newPassword');
    } else if (this.addUserForm.get('repeatPassword').pristine) {
      this._toast.error('Please enter repeatPassword');
    } else {
      this.addUser(this.addUserForm.value);
    }
  }

  addUser(d) {
    this._admin.postApiWithAuth(this.addUserURL, d).subscribe(
      (res) => {
        this._toast.success(res.status.message);
      },
      (err) => {
        // console.log('Add User Service Response', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this.closeModal();
  }

  closeModal() {
    this.addUserForm.setValue({
      role: '',
      email: '',
      userId: '',
      userName: '',
      department: '',
      newPassword: '',
      repeatPassword: '',
    });
    console.log('Modal Close');
  }
}
