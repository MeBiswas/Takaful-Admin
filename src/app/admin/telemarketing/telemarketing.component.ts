import { Component, OnInit, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Material Table Dependencies
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Animations
import {
  state,
  style,
  animate,
  trigger,
  transition,
} from '@angular/animations';

// Select Option Interface
interface Filter {
  value: string;
  option: string;
}

@Component({
  selector: 'app-telemarketing',
  templateUrl: './telemarketing.component.html',
  styleUrls: ['./telemarketing.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TelemarketingComponent implements OnInit {
  search = '';
  basket: any = [];
  filter = 'monthly';
  detailComponentData = '';
  dataSource = new MatTableDataSource();
  telemarketingURL = '/admin/marketing/list/';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filters: Filter[] = [
    { value: 'weekly', option: 'Weekly' },
    { value: 'monthly', option: 'Monthly' },
  ];

  columnsToDisplay: string[] = [
    'vehiclePlateNo',
    'customerName',
    'paymentDate',
    'principal',
    'carModel',
    'status',
    'customerService',
  ];

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getTableData(this.filter);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Filter Event
  onFilterChanged(e) {
    this.getTableData(e);
  }

  // Service Call to get Table Data
  private getTableData(filter) {
    this._spin.show();
    this._admin.getApiWithAuth(this.telemarketingURL + filter).subscribe(
      (res) => {
        this.dataSource.data = res.telemarketingList;
      },
      (err) => {
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this._spin.hide();
  }

  // Pagination Event
  pageChanged(e) {
    // console.log('Pagination Event', e);
  }

  // Filter Table with Search Input
  searchFor(s: string) {
    this.dataSource.filter = s.trim().toLocaleLowerCase();
  }

  // On Expanding Table
  onTableExpand(d) {
    this.detailComponentData = d;
  }
}
