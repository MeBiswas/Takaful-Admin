import { Component, OnInit } from '@angular/core';
// Activated Route
import { ActivatedRoute } from '@angular/router';
// Material Table Dependencies
import { MatTableDataSource } from '@angular/material/table';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Select Option Interface
interface Filter {
  value: string;
  option: string;
}

@Component({
  selector: 'app-common-basket',
  templateUrl: './common-basket.component.html',
  styleUrls: ['./common-basket.component.css'],
})
export class CommonBasketComponent implements OnInit {
  routeData;
  filter = 'Monthly';
  dataSource = new MatTableDataSource();
  basketURL = '/admin/dashboard/followup/list';
  filters: Filter[] = [
    { value: 'Weekly', option: 'Weekly' },
    { value: 'Monthly', option: 'Monthly' },
  ];

  displayedColumns: string[] = [
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
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRouteData();
    this.getTableData(this.filter);
  }

  private getRouteData() {
    this.activatedroute.data.subscribe((data) => {
      this.routeData = { ...data };
    });
  }

  onFilterChanged(e) {
    this.getTableData(e);
  }

  tableBodyData(r, f) {
    let data = {
      type: '',
      filter: '',
      isUrgent: '',
    };
    data.filter = f;
    data.type = r.page;
    data.isUrgent = r.subCategory === 'Urgent' ? 'Y' : 'N';
    return data;
  }

  private getTableData(filter) {
    let d = this.tableBodyData(this.routeData, filter);
    this._admin.postApiWithAuth(this.basketURL, d).subscribe(
      (res) => {
        console.log('Basket Table Data Service Response', res);
        this.dataSource.data = [...res.list];
      },
      (err) => {
        console.log('Basket Table Data Service Response', err);
      }
    );
  }
}
