import { Component, OnInit } from '@angular/core';

// Select Option Interface
interface Filter {
  value: string;
  option: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  filter = 'Weekly';

  filters: Filter[] = [
    { value: 'Weekly', option: 'This Week' },
    { value: 'Monthly', option: 'This Month' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onFilterChanged(value) {
    // console.log('Filter Change', value);
  }
}
