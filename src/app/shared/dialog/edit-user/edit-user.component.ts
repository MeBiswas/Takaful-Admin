import { Component, OnInit, Input } from '@angular/core';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input() data;

  updateUserURL = '/security/addupdateuser';

  updateData = {
    role: '',
    email: '',
    userId: '',
    password: '',
    userName: '',
    department: '',
    repeatPassword: '',
  };

  constructor(private _admin: AdminService, private _toast: ToastrService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.updateData = { ...this.data };
  }

  editUser() {
    this._admin.postApiWithAuth(this.updateUserURL, this.updateData).subscribe(
      (res) => {
        this._toast.success(res.status.message);
      },
      (err) => {
        // console.log('Edit User Service Response', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this.closeModal();
  }

  closeModal() {
    this.updateData = {
      role: '',
      email: '',
      userId: '',
      password: '',
      userName: '',
      department: '',
      repeatPassword: '',
    };
    console.log('Modal Close');
  }
}
