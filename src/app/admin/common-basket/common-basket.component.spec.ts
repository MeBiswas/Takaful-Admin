import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBasketComponent } from './common-basket.component';

describe('CommonBasketComponent', () => {
  let component: CommonBasketComponent;
  let fixture: ComponentFixture<CommonBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonBasketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
