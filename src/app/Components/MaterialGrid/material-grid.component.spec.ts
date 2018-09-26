import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGridComponent } from './material-grid.component';

describe('MaterialGridComponent', () => {
  let component: MaterialGridComponent;
  let fixture: ComponentFixture<MaterialGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
