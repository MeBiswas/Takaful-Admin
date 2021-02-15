import { Component, OnInit, ViewChild } from '@angular/core';
// Form
import { NgForm } from '@angular/forms';
// Router
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Interface
import { Filter } from '../../model/filter';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Material Table Dependencies
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// Service
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-target-achiever',
  templateUrl: './target-achiever.component.html',
  styleUrls: ['./target-achiever.component.css'],
})
export class TargetAchieverComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('testForm') testForm: NgForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  search = '';
  d = new Date();
  listData: any = [];
  filter = 'January';
  editedData: any = [];
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

  constructor(
    private _router: Router,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.achieverList(this.filter);
  }

  // LifeCycle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Achiever List Service
  private achieverList(f) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.achievementListURL, { month: f })
      .subscribe(
        (res) => {
          if (res.status.code === 0) {
            this.addActionData(res.list);
          } else if (res.status.code === 401) {
            this._router.navigate(['/auth/login']);
            this._toast.warning(res.status.message);
          } else {
            this._toast.error('Oops! Something went wrong.');
          }
          res ? this._spin.hide() : null;
        },
        (err) => {
          err ? this._spin.hide() : null;
          this._toast.error('Oops! Something went wrong.');
        }
      );
  }

  // Adding Table Action Column Data
  addActionData(d) {
    let newArr = [...d];
    this.listData = newArr.map(
      (item, index) => (item = { ...item, action: item, id: index })
    );
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

  // Handling Input Data
  edited(user) {
    const id = user.userId;
    const target =
      user.target.split(' ')[0] === 'RM'
        ? user.target.split(' ')[1]
        : user.target.split(' ')[0];
    const achiever =
      user.achiever.split(' ')[0] === 'RM'
        ? user.achiever.split(' ')[1]
        : user.achiever.split(' ')[0];
    this.updateHandler(id, target, achiever);
  }

  // Update Button Handler
  updateHandler(id, t, a) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.updateAchievementURL, {
        userId: id,
        target: parseFloat(t),
        achiever: parseFloat(a),
      })
      .subscribe(
        (res) => {
          res ? this._spin.hide() : null;
          if (res.status.code === 0) {
            this._toast.success('Successfully Updated');
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }
        },
        (err) => {
          err ? this._spin.hide() : null;
          this._toast.error('Oops! Something went wrong.');
        }
      );
  }
}
