import { Component, OnInit } from '@angular/core';
// Service
import { ModalService } from '../../_modal';
import { AdminService } from '../../services/admin/admin.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  showModal = false;
  dummyDataList = [
    {
      name: 'John Doe',
      id: 1,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 2,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 3,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 4,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 5,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 6,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 7,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 8,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 9,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 10,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 11,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 12,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 13,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 14,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 15,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 16,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
    {
      name: 'John Doe',
      id: 17,
      email: 'abc@email.com',
      department: 'QA Agency',
      role: 'Admin',
    },
  ];

  userListResponseData = {
    userList: [],
  };

  userListUrl = '/security/userlist/1';

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService,
    public modalService: ModalService
  ) {}

  ngOnInit() {
    this.getUsersList();
  }

  openModal(id) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getUsersList() {
    this._spin.show();
    this._admin.getApiWithAuth(this.userListUrl).subscribe(
      (res) => {
        this.userListResponseData = { ...this.userListResponseData, ...res };
        console.log('Response in User List Service', this.userListResponseData);
      },
      (err) => {
        console.log('Error in User List Service', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this._spin.hide();
  }
}
