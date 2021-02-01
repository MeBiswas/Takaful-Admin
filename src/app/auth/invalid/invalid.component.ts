import { Component, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Provider
import { DataStorage } from '../../providers/user-data.provider';

@Component({
  selector: 'app-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.css'],
})
export class InvalidComponent implements OnInit {
  error = this._data.data.message;

  constructor(private _router: Router, private _data: DataStorage) {}

  ngOnInit(): void {}

  clickHandler() {
    this._router.navigate(['/auth/login']);
  }
}
