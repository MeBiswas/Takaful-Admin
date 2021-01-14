import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow-urgent-ncd',
  templateUrl: './follow-urgent-ncd.component.html',
  styleUrls: ['./follow-urgent-ncd.component.css'],
})
export class FollowUrgentNcdComponent implements OnInit {
  @Input() data: string;

  constructor() {}

  ngOnInit(): void {}
}
