import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressloaderComponent } from './progressloader.component';

describe('ProgressloaderComponent', () => {
  let component: ProgressloaderComponent;
  let fixture: ComponentFixture<ProgressloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
