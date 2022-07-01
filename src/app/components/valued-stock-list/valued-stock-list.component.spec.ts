import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuedStockListComponent } from './valued-stock-list.component';

describe('ValuedStockListComponent', () => {
  let component: ValuedStockListComponent;
  let fixture: ComponentFixture<ValuedStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuedStockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuedStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
