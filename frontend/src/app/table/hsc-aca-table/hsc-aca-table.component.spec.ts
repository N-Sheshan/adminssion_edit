import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscAcaTableComponent } from './hsc-aca-table.component';

describe('HscAcaTableComponent', () => {
  let component: HscAcaTableComponent;
  let fixture: ComponentFixture<HscAcaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HscAcaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HscAcaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
