import { Input, OnInit, Component, ViewChild, OnChanges } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Service
import { AdminService } from '../../../services/admin/admin.service';
// Pattern
const msgPattern = /^[a-zA-Z0-9_ ]*$/;

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
})
export class CallComponent implements OnInit, OnChanges {
  @Input() data;

  firstName: string;

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // LifeCycle Method
  ngOnChanges() {
    let fname = this.data.name.split(' ');
    this.firstName = fname[0];
  }
}
