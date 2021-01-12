import { Component, OnInit, Input } from '@angular/core';
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

  showModal = false;

  updateUserURL = '/security/deleteuser';

  constructor(private _admin: AdminService, private _toast: ToastrService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.showModal = this.data;
  }
}
