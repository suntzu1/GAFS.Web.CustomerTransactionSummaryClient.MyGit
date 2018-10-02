import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAssetViewerComponent } from './contract-asset-viewer.component';

describe('ContractAssetViewerComponent', () => {
  let component: ContractAssetViewerComponent;
  let fixture: ComponentFixture<ContractAssetViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAssetViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAssetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
