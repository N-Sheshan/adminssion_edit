import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscVocTableComponent } from './hsc-voc-table.component';

describe('HscVocTableComponent', () => {
  let component: HscVocTableComponent;
  let fixture: ComponentFixture<HscVocTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HscVocTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HscVocTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
