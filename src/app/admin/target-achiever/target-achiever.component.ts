import { Component, OnInit, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Material Table Dependencies
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// Service
import { AdminService } from '../../services/admin/admin.service';

// Select Option Interface
interface Filter {
  value: string;
  option: string;
}

@Component({
  selector: 'app-target-achiever',
  templateUrl: './target-achiever.component.html',
  styleUrls: ['./target-achiever.component.css'],
})
export class TargetAchieverComponent implements OnInit {
  search = '';
  listData: any = [];
  filter = 'monthly';
  dataSource = new MatTableDataSource();
  achievementListURL = '/admin/achievementlist';

  filters: Filter[] = [
    { value: 'weekly', option: 'Weekly' },
    { value: 'monthly', option: 'Monthly' },
  ];

  displayedColumns: string[] = [
    'user',
    'role',
    'department',
    'target',
    'achiever',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _admin: AdminService, private _toast: ToastrService) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.achieverList();
  }

  // LifeCycle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Achiever List Service
  private achieverList() {
    this._admin.getApiWithAuth(this.achievementListURL).subscribe(
      (res) => {
        this.addActionData(res.list);
      },
      (err) => {
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }

  // Adding Table Action Column Data
  addActionData(d) {
    let newArr = [...d];
    this.listData = newArr.map((item) => (item = { ...item, action: item }));
    this.dataSource.data = [...this.dataSource.data, ...this.listData];
  }

  // Pagination Event
  pageChanged(e) {
    // do something
  }

  // Filter Table with Search Input
  searchFor(s: string) {
    this.dataSource.filter = s.trim().toLocaleLowerCase();
  }

  // Filter Event
  onFilterChanged(e) {
    // do something
  }

  // Table Input Event
  targetInput(v, action) {
    console.log('ethe aa', v);
    action.target = v;
    // this.dataSource.data.map((item) => {
    //   if (action.user === item.user) {
    //     item.action = action;
    //   }
    // });
    // console.log('ethe aaa', action);
  }
}
