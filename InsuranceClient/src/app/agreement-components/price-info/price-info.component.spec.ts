import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceInfoComponent } from './price-info.component';

describe('PriceInfoComponent', () => {
  let component: PriceInfoComponent;
  let fixture: ComponentFixture<PriceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
