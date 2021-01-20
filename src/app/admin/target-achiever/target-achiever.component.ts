import { Component, OnInit, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Material Table Dependencies
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-target-achiever',
  templateUrl: './target-achiever.component.html',
  styleUrls: ['./target-achiever.component.css'],
})
export class TargetAchieverComponent implements OnInit {
  filter = '';
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'userId',
    'role',
    'department',
    'target',
    'Achiever',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _toast: ToastrService) {}

  ngOnInit(): void {}

  // LifeCycle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
