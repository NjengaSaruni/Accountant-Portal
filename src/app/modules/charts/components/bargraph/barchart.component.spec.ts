import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BarchartComponent} from './barchart.component';
import {getMockBarchart} from '../../../../common/utils/randomInt';

describe('BarchartComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
    component.chart = getMockBarchart();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
