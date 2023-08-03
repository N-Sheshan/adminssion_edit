import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgMasterTableComponent } from './fg-master-table.component';

describe('FgMasterTableComponent', () => {
  let component: FgMasterTableComponent;
  let fixture: ComponentFixture<FgMasterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FgMasterTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FgMasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
