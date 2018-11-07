import { Component, OnInit } from '@angular/core';
// import { Asset } from '../../Models/asset';
import { Address } from '../../Models/address';
import { ContractAssets } from '../../Models/contract';
// import { AssetService } from '../../Services/asset.service';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../../Services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AssetViewerComponent } from '../asset-viewer/asset-viewer.component';
import { IconTypes, AlertTypes, CustomAlertComponent } from '../CustomAlert/customalert.component';
import { CommonfunctionsModule } from '../../commonfunctions/commonfunctions.module';
import { Asset } from 'src/app/Models/cts-api.asset';
import { CtsApiService } from 'src/app/Services/cts-api.service';

@Component({
  selector: 'cts-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css', '../datagridstyle.css']
})
export class AssetComponent implements OnInit {
  workingAsset: Asset = {
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
    stateTaxRate: 0
  };
  resultAssets: Asset[];
  showCheckBoxes: boolean;
  selectAllContract: any;

  workingcontractAsset: Asset[] = [];
  allcontractsAssets: ContractAssets[] = [];
  checkedAsset: any = [];
  private serviceObject = new BehaviorSubject(this.allcontractsAssets);

  constructor(
    private api: CtsApiService,
    private data: DataService,
    public dialog: MatDialog,
    private cmnfn: CommonfunctionsModule) { }

  ngOnInit() {
    this.resultAssets = [];
    this.showCheckBoxes = true;

    this.selectAllContract = this.workingAsset;
    // this.applyResult();
    if (!this.data.checkedAsset) { this.data.checkedAsset = this.checkedAsset; }
  }
  storeState() {
    this.data.checkedAsset = this.checkedAsset;
  }
  applyResult() {
    if (this.data.loadedAssets && this.data.loadedAssets.length > 0) {
      this.parseContractAssets();
    } else {
      this.api.GetAssetsByCustomerId('').subscribe(
        (response: any) => {
          // this.resultAssets = response;
          // for (let i = 0; i < 5; ++i) {
          //   const a = this.resultAssets[i];
          //   const c = this.allcontractsAssets.find(x => x.ContractNumber === a.ContractNumber);
          //   if (c) {
          //     c.Assets.push(a);
          //   } else {
          //     const ca: ContractAssets = {
          //       ContractNumber: a.ContractNumber,
          //       Assets: [a]
          //     };
          //     this.allcontractsAssets.push(ca);
          //   }
          // }
        }
      );
    }
    if (this.data.checkedAsset.length > 0) { this.checkedAsset = this.data.checkedAsset; }
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
  }
  checkIfSelected(c): boolean {
    return this.selectAllContract === c;
  }

  sendAssetData() {
    this.data.changeAssetsTriggered(this.workingcontractAsset);
    const diaCnfg: MatDialogConfig = {
      disableClose: true,
      autoFocus: true
    };
    diaCnfg.data = {
      title: 'Confirmation Page'
    };
    const dialogRef = this.dialog.open(AssetViewerComponent, diaCnfg);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result === 'accept') {
        // todo: sunil - the submission data was accepted, send to API... end of CTS workflow
        this.cmnfn.showAlert(this.dialog,
          'Information', '', 'Assets data submitted',
          IconTypes.Information, AlertTypes.Info);
      }
    });
  }

  checkToggled(o, x, y) {
    debugger;
    this.checkedAsset[x][y] = !this.checkedAsset[x][y];
    const index = this.workingcontractAsset.indexOf(o.asset);
    if (index > -1) {
      if (!o.selected) {
        this.workingcontractAsset.splice(index, 1);
      }
    } else {
      this.workingcontractAsset.push(o.asset);
    }
    // const fa = this.workingcontractAsset.find(a => a.AssetID === o.asset.AssetID);
    // if (!fa) {
    //   this.workingcontractAsset.push(o.asset);
    // }
    console.log(this.checkedAsset);
  }

  clickAssetSelectAll(ca, e, x) {
    const chk = e.currentTarget.checked; // e.srcElement.checked;
    ca.Assets.map(a => {
      const index = this.workingcontractAsset.indexOf(a);
      if (index > -1) {
        if (!chk) {
          this.workingcontractAsset.splice(index, 1);
        }
      } else {
        this.workingcontractAsset.push(a);
      }
    });
    const ac = this.allcontractsAssets[x];
    for (let y = 0; y < ac.Assets.length; ++y) {
      this.checkedAsset[x][y] = chk;
    }
  }
}

/*
const w_Asset: Asset = {
  ContractNumber: null,
  AssetID: null,
  Manufacturer: 'Other',
  Model: '',
  SerialNumber: '',
  VendorMachineID: '',
  AssetAddress: null,
  PPTX: '',
  SalesTax: null,
  FinancedAmt: 11250,
  AgreementOveragesBilledOn: '',
  ContractActive: null,
};

const r_Asset1: Asset = {
  ContractNumber: '1083023-081',
  AssetID: 1273115,
  Manufacturer: 'Epson',
  Model: 'SureColor T5270',
  SerialNumber: 'U7UE000364',
  VendorMachineID: '',
  AssetAddress: {
    StreetAddress: '450 Riverchase Pkwy E',
    Address2: 'Facilities',
    City: 'Hoover',
    State: 'AL',
    Zip: '35244-2858',
    Contact: ''
  },
  PPTX: '',
  SalesTax: 100.37,
  FinancedAmt: 10007.37,
  AgreementOveragesBilledOn: '',
  ContractActive: true
};

const r_Asset2: Asset = {
  ContractNumber: '1083023-079',
  AssetID: 1262201,
  Manufacturer: 'Xerox',
  Model: 'AltaLink C8035 with',
  SerialNumber: '2TX061119',
  VendorMachineID: '',
  AssetAddress: {
    StreetAddress: '450 Riverchase Pkwy E',
    Address2: 'Parking Deck Maint',
    City: 'Hoover',
    State: 'AL',
    Zip: '35244-2858',
    Contact: ''
  },
  PPTX: '',
  SalesTax: 89.5,
  FinancedAmt: 8951.38,
  AgreementOveragesBilledOn: '',
  ContractActive: true,
};

const r_Asset3: Asset = {
  ContractNumber: '1083023-078',
  AssetID: 1265252,
  Manufacturer: 'Xerox',
  Model: 'AltaLink C8055',
  SerialNumber: '8TB581152',
  VendorMachineID: '',
  AssetAddress: {
    StreetAddress: '450 Riverchase Pkwy E',
    Address2: 'Facilities 1st West',
    City: 'Hoover',
    State: 'AL',
    Zip: '35244-2858',
    Contact: ''
  },
  PPTX: '',
  SalesTax: 150.48,
  FinancedAmt: 15153.48,
  AgreementOveragesBilledOn: '',
  ContractActive: true,
};

const r_Asset4: Asset = {
  ContractNumber: '1083023-080',
  AssetID: 1262973,
  Manufacturer: 'Xerox',
  Model: 'AltaLink C8035 with',
  SerialNumber: '2TX059024',
  VendorMachineID: '',
  AssetAddress: {
    StreetAddress: '2 N Jackson St Ste 202',
    Address2: null,
    City: 'Montgomery',
    State: 'AL',
    Zip: '36104-3821',
    Contact: ''
  },
  PPTX: 'Lessor Files ',
  SalesTax: 110.62,
  FinancedAmt: 11189.62,
  AgreementOveragesBilledOn: '1083023-081',
  ContractActive: true,
};

const r_Asset5: Asset = {
  ContractNumber: '1083023-081',
  AssetID: 1273127,
  Manufacturer: 'Epson',
  Model: 'SureColor T5270',
  SerialNumber: 'U7UE000364',
  VendorMachineID: '',
  AssetAddress: {
    StreetAddress: '450 Riverchase Pkwy E',
    Address2: 'Facilities',
    City: 'Hoover',
    State: 'AL',
    Zip: '35244-2858',
    Contact: ''
  },
  PPTX: '',
  SalesTax: 101.99,
  FinancedAmt: 10127.99,
  AgreementOveragesBilledOn: '',
  ContractActive: true
};
*/

