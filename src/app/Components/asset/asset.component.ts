import { Component, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { Address } from '../../Models/address';
import { ContractAssets } from '../../Models/contract';

@Component({
  selector: 'cts-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css', '../datagridstyle.css']
})
export class AssetComponent implements OnInit {
  workingAsset: Asset;
  resultAssets: Asset[];
  showCheckBoxes: boolean;
  selectAllContract: any;

  workingcontractAsset: ContractAssets;
  allcontractsAssets: ContractAssets[] = [];
  constructor() { }

  ngOnInit() {
    this.workingAsset = w_Asset;
    this.resultAssets = [];
    this.showCheckBoxes = true;
    this.resultAssets.push(r_Asset1);
    this.resultAssets.push(r_Asset2);
    this.resultAssets.push(r_Asset3);
    this.resultAssets.push(r_Asset4);
    this.resultAssets.push(r_Asset5);
    this.selectAllContract = this.workingAsset;
    for (let i = 0; i < 5; ++i) {
      const a = this.resultAssets[i];
      const c = this.allcontractsAssets.find(x => x.ContractNumber === a.ContractNumber);
      if (c) {
        c.Assets.push(a);
      } else {
        const ca: ContractAssets = {
          ContractNumber: a.ContractNumber,
          Assets: [a]
        };
        this.allcontractsAssets.push(ca);
      }
    }
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
}

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

