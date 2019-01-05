import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartComponent } from './barchart.component';
import {BarChart} from '../../models/BarChart/BarChart';

describe('BarchartComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;

  beforeEach(async(() => {
    let expectedChart: BarChart;
    TestBed.configureTestingModule({
      declarations: [ BarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
