import { Component, OnInit } from '@angular/core';
// Activated Route
import { ActivatedRoute } from '@angular/router';
// Service
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.css'],
})
export class CommonTableComponent implements OnInit {
  product;
  basketURL = '/admin/dashboard/followup/list';

  constructor(private activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedroute.data.subscribe((data) => {
      this.product = { ...data };
    });
  }
}
