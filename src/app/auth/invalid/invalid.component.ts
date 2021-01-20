import { Component, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.css'],
})
export class InvalidComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  clickHandler() {
    this._router.navigate(['/auth/login']);
  }
}
