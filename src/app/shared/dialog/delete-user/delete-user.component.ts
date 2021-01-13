import { Component, OnInit, Input, ViewChild } from '@angular/core';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  @Input() data;
  @ViewChild('closeBtn') closeBtn;

  userID;

  updateUserURL = '/security/deleteuser';

  constructor(private _admin: AdminService, private _toast: ToastrService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.userID = this.data;
  }

  deleteUser() {
    let data = {
      userId: this.userID,
    };
    this._admin.deleteApiWithAuth(this.updateUserURL, data).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this._toast.success('User deleted successfully');
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          this._toast.warning(res.status.message);
        }
      },
      (err) => {
        this._toast.error('Oops! Something went wrong.');
        // console.log('Delete User Service Response Error', err);
      }
    );
    this.closeModal();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
