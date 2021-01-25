import { Component, OnInit, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Material Table Dependencies
import { MatSort } from '@angular/material/sort';
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
  filter = 'January';
  dataSource = new MatTableDataSource();
  achievementListURL = '/admin/achievementlist';
  updateAchievementURL = '/admin/updateachievement';

  filters: Filter[] = [
    { value: 'January', option: 'January' },
    { value: 'February', option: 'February' },
    { value: 'March', option: 'March' },
    { value: 'April', option: 'April' },
    { value: 'May', option: 'May' },
    { value: 'June', option: 'June' },
    { value: 'July', option: 'July' },
    { value: 'August', option: 'August' },
    { value: 'September', option: 'September' },
    { value: 'October', option: 'October' },
    { value: 'November', option: 'November' },
    { value: 'December', option: 'December' },
  ];

  displayedColumns: string[] = [
    'userId',
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
    this.achieverList(this.filter);
  }

  // LifeCycle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Achiever List Service
  private achieverList(f) {
    this._admin
      .postApiWithAuth(this.achievementListURL, { month: f })
      .subscribe(
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
    this.dataSource.data = [...this.listData];
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
    this.achieverList(e);
  }

  // Update Button Handler
  updateHandler(d, t, a) {
    d = { ...d, target: t, achiever: a };
    this._admin
      .postApiWithAuth(this.updateAchievementURL, {
        userId: d.userId,
        target: parseFloat(d.target),
        achiever: parseFloat(d.achiever),
      })
      .subscribe(
        (res) => {
          if (res.status.code === 0) {
            this._toast.success('Successfully Updated');
          }
        },
        (err) => {
          this._toast.error('Oops! Something went wrong.');
        }
      );
  }
}
