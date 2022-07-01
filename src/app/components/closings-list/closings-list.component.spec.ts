import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingsListComponent } from './closings-list.component';

describe('ClosingsListComponent', () => {
  let component: ClosingsListComponent;
  let fixture: ComponentFixture<ClosingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
