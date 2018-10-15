import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPopupComponent } from './tax-popup.component';

describe('TaxPopupComponent', () => {
  let component: TaxPopupComponent;
  let fixture: ComponentFixture<TaxPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
