import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { Asset } from '../../Models/asset';
import { Address } from '../../Models/address';
import { ContractAssets } from '../../Models/contract';
// import { AssetService } from '../../Services/asset.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from '../../Services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AssetViewerComponent } from '../asset-viewer/asset-viewer.component';
import { IconTypes, AlertTypes, CustomAlertComponent } from '../CustomAlert/customalert.component';
import { CommonfunctionsModule } from '../../commonfunctions/commonfunctions.module';
import { Asset } from 'src/app/Models/cts-api.asset';
import { CtsApiService } from 'src/app/Services/cts-api.service';
import { ContractAssetViewerComponent } from '../contract-asset-viewer/contract-asset-viewer.component';
import { LoaderService } from 'src/app/Services/loader-service';
import { ApiResponse } from 'src/app/Models/cts-api';

@Component({
  selector: 'cts-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css', '../datagridstyle.css']
})
export class AssetComponent implements OnInit {
  @Output() doRefresh: EventEmitter<number> = new EventEmitter();
  workingAsset: any = {
    // ContractNumber: null,
    assetId: null,
    assetDescription: '',
    assetCost: 0,
    // assetDetailGrouping: '',
    assetVendorId: '',
    assetVendorName: '',
    assetManufacturer: '',
    assetModel: '',
    serialNumber: '',
    vendorMachineId: '',
    // AssetAddress: null,
    // PPTX: '',
    // SalesTax: null,
    financedAmount: 0,
    // AgreementOveragesBilledOn: '',
    // ContractActive: null,
    quantity: 0,
    salesTaxExempt: false,
    listPrice: 0,
    originalCost: 0,
    manufacturerDesc: '',
    stateTaxRate: 0,
    propertyTaxStatusId: '',
    propertyTaxStatusDescription: '',
    activeContract: false,
    overageContractId: ''
  };
  resultAssets: Asset[];
  showCheckBoxes: boolean;
  selectAllContract: any;

  // workingcontractAsset: Asset[] = [];
  allcontractsAssets: ContractAssets[] = [];
  checkedAsset: any = [];
  private serviceObject = new BehaviorSubject(this.allcontractsAssets);

  constructor(
    private api: CtsApiService,
    private data: DataService,
    public dialog: MatDialog,
    private cmnfn: CommonfunctionsModule,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.resultAssets = [];
    this.showCheckBoxes = true;

    this.selectAllContract = this.workingAsset;
    // this.applyResult();
    if (!this.data.checkedAsset) { this.data.checkedAsset = this.checkedAsset; }
  }
  storeState() {
    if (this.checkedAsset && this.checkedAsset.length > 0) { this.data.checkedAsset = this.checkedAsset; }
    if (!this.data.workingcontractAsset) { this.data.workingcontractAsset = []; }
  }

  responseError(ex) {
    this.cmnfn.showAlert(this.dialog, 'Error', '', ex, IconTypes.Critical, AlertTypes.Info);
  }

  applyResult() {
    if (this.data.loadedAssets && this.data.loadedAssets.length > 0) {
      if (this.data.workingcontractAsset) { this.data.workingcontractAsset = this.data.workingcontractAsset; }
      this.parseContractAssets();
    } else {
      this.api.GetAssetsByCustomerId('').subscribe(
        (response: any) => {

        }, error => this.responseError(error)
      );
    }
    if (this.data.checkedAsset.length > 0) { this.checkedAsset = this.data.checkedAsset; }
    this.loader.hide();
  }

  parseContractAssets() {
    for (let i = 0; i < this.data.loadedAssets.length; ++i) {
      const a = this.data.loadedAssets[i];
      const c = this.allcontractsAssets.find(x => x.ContractNumber === a['ContractNumber']);
      if (c) {
        const x = c.Assets.find(xc => xc.assetId === a.assetId);
        if (!x) {
          c.Assets.push(a);
        }
      } else {
        const ca: ContractAssets = {
          ContractNumber: a['ContractNumber'],
          Assets: [a]
        };
        this.allcontractsAssets.push(ca);
      }
    }
    this.initCheckedList();
  }

  initCheckedList() {
    this.checkedAsset = [];
    for (let x = 0; x < this.allcontractsAssets.length; ++x) {
      this.checkedAsset[x] = [];
      const ac = this.allcontractsAssets[x];
      for (let y = 0; y < ac.Assets.length; ++y) {
        this.checkedAsset[x][y] = false;
      }
    }
  }

  addSelectedContractAsset(ca: ContractAssets) {

  }

  ToAddressString(address: Address): string {
    if (address == null) {
      return '';
    }
    return `${address.StreetAddress}
    ${ address.Address2}
    ${ address.City}, ${address.State}, ${address.Zip}`;
  }
  selectAllApplication(c) {
    this.selectAllContract = c;
  }
  clearAllSelections() {
    this.selectAllContract = this.workingAsset;
    this.data.workingcontractAsset = [];
    this.initCheckedList();
  }
  checkIfSelected(c): boolean {
    return this.selectAllContract === c;
  }

  sendAssetData() {
    // this.data.workingcontractAsset = this.data.workingcontractAsset;
    this.data.changeAssetsTriggered(this.data.workingcontractAsset);
    const diaCnfg: MatDialogConfig = {
      disableClose: true,
      autoFocus: true
    };
    diaCnfg.data = {
      title: 'Confirmation Page'
    };
    const dialogRef = this.dialog.open(AssetViewerComponent, diaCnfg);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        this.api.SendAssetsData()
          .subscribe(res => {
            this.doRefresh.emit(this.data.loadedApplication.applications[0].applicationId);
            this.cmnfn.showAlert(this.dialog, 'Information', '',
              'Assets data submitted', IconTypes.Information,
              AlertTypes.Info);
          }, error => this.responseError(error));
      }
    });
  }

  sendContractAssetData() {
    this.data.changeContractTriggered(this.data.modifiedContract);
    this.data.changeAssetsTriggered(this.data.workingcontractAsset);
    const diaCnfg: MatDialogConfig = {
      disableClose: true,
      autoFocus: true
    };
    diaCnfg.data = {
      title: 'Confirmation Page'
    };
    const dialogRef = this.dialog.open(ContractAssetViewerComponent, diaCnfg);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        this.api.SendContractAndAssets()
          .subscribe(res => {
            this.doRefresh.emit(this.data.loadedApplication.applications[0].applicationId);
            this.cmnfn.showAlert(this.dialog, 'Information', '',
              'Contact and Assets data submitted', IconTypes.Information,
              AlertTypes.Info);
          }, error => this.responseError(error));
      }
    });
  }

  checkToggled(o, x, y) {
    this.checkedAsset[x][y] = !this.checkedAsset[x][y];
    const index = this.data.workingcontractAsset.indexOf(o.asset);
    if (index > -1) {
      if (!o.selected) {
        this.data.workingcontractAsset.splice(index, 1);
      }
    } else {
      this.data.workingcontractAsset.push(o.asset);
    }
  }

  clickAssetSelectAll(ca, e, x, chk) {
    ca.Assets.map(a => {
      const index = this.data.workingcontractAsset.indexOf(a);
      if (index > -1) {
        if (!chk) {
          this.data.workingcontractAsset.splice(index, 1);
        }
      } else {
        this.data.workingcontractAsset.push(a);
      }
    });
    const ac = this.allcontractsAssets[x];
    for (let y = 0; y < ac.Assets.length; ++y) {
      this.checkedAsset[x][y] = chk;
    }
  }
}