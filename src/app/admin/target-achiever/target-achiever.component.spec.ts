import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAchieverComponent } from './target-achiever.component';

describe('TargetAchieverComponent', () => {
  let component: TargetAchieverComponent;
  let fixture: ComponentFixture<TargetAchieverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetAchieverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAchieverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
