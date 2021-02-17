import { Component, OnInit, Input, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Service
import { AdminService } from '../../../services/admin/admin.service';

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

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // LifeCycle Method
  ngOnChanges() {
    this.userID = this.data;
  }

  // Service Handler
  deleteUser() {
    this._spin.show();
    this._admin
      .deleteApiWithAuth(this.updateUserURL, {
        userId: this.userID,
      })
      .subscribe((res) => {
        res ? this._spin.hide() : null;
        if (res.status.code === 0) {
          this._toast.success('User deleted successfully');
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          this._toast.warning(res.status.message);
        }
      });
    this.closeModal();
  }

  // Close Modal Handler
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
