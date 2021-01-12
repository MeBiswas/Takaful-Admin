import { Component, OnInit, Input } from '@angular/core';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  @Input() data;
  showModal = false;

  addUserURL = '/security/addupdateuser';

  userData = {
    role: '',
    email: '',
    userId: '',
    userName: '',
    department: '',
    newPassword: '',
    repeatPassword: '',
  };

  constructor(private _admin: AdminService, private _toast: ToastrService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.showModal = this.data;
  }

  addUser() {
    this._admin.postApiWithAuth(this.addUserURL, this.userData).subscribe(
      (res) => {
        this._toast.success(res.status.message);
      },
      (err) => {
        console.log('Add User Service Response', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this.showModal = false;
  }
}
