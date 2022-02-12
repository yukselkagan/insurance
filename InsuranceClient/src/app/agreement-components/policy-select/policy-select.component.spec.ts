import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySelectComponent } from './policy-select.component';

describe('PolicySelectComponent', () => {
  let component: PolicySelectComponent;
  let fixture: ComponentFixture<PolicySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
