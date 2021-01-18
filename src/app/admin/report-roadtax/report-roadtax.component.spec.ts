import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRoadtaxComponent } from './report-roadtax.component';

describe('ReportRoadtaxComponent', () => {
  let component: ReportRoadtaxComponent;
  let fixture: ComponentFixture<ReportRoadtaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRoadtaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRoadtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
