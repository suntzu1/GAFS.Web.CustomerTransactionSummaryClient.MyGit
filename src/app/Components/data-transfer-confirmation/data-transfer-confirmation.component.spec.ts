import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferConfirmationComponent } from './data-transfer-confirmation.component';

describe('DataTransferConfirmationComponent', () => {
  let component: DataTransferConfirmationComponent;
  let fixture: ComponentFixture<DataTransferConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTransferConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTransferConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
