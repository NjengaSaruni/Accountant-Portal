import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsFormComponent } from './budgets-form.component';

describe('BudgetsFormComponent', () => {
  let component: BudgetsFormComponent;
  let fixture: ComponentFixture<BudgetsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
