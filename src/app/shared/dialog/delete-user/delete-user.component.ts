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
    this.updateUserURL = `${this.updateUserURL}/${this.userID}`;
    this._admin.deleteApiWithAuth(this.updateUserURL).subscribe(
      (res) => {
        console.log('Delete User Service Response', res);
        this.closeModal();
      },
      (err) => {
        console.log('Delete User Service Response Error', err);
      }
    );
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
