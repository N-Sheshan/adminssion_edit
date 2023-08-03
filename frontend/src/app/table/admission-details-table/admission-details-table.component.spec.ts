import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionDetailsTableComponent } from './admission-details-table.component';

describe('AdmissionDetailsTableComponent', () => {
  let component: AdmissionDetailsTableComponent;
  let fixture: ComponentFixture<AdmissionDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
