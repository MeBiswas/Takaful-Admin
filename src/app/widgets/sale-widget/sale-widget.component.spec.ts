import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleWidgetComponent } from './sale-widget.component';

describe('SaleWidgetComponent', () => {
  let component: SaleWidgetComponent;
  let fixture: ComponentFixture<SaleWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
