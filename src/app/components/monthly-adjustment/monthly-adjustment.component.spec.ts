import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAdjustmentComponent } from './monthly-adjustment.component';

describe('MonthlyAdjustmentComponent', () => {
  let component: MonthlyAdjustmentComponent;
  let fixture: ComponentFixture<MonthlyAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
