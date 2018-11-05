import { Component, OnInit } from '@angular/core';
import { Address } from '../../Models/address';
import {
  MatDialog, MatDialogConfig
} from '@angular/material';
// import { ContractService } from '../../Services/contract.service';
import { CtsApiService } from '../../Services/cts-api.service';
import { DataService } from '../../Services/data.service';
import { BehaviorSubject } from 'rxjs';
import { ContractViewerComponent } from '../contract-viewer/contract-viewer.component';
import { IconTypes, AlertTypes } from '../CustomAlert/customalert.component';
import { CommonfunctionsModule } from '../../commonfunctions/commonfunctions.module';
import { ContractAssetViewerComponent } from '../contract-asset-viewer/contract-asset-viewer.component';
import { Contract } from 'src/app/Models/cts-api.contract';


@Component({
  selector: 'cts-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css', '../datagridstyle.css']
})
export class ContractComponent implements OnInit {
  workingContract: any = {};
  modifiedContract: Contract;
  resultContracts: Contract[] = [];
  showCheckBoxes: boolean;
  selectAllContract: Contract;

  displayedCols: [
    { key: 'ApplicationNumber', display: 'ApplicationNumber' },
    { key: 'MasterAgreementNumber', display: 'MasterAgreementNumber' },
    { key: 'ContractNumber', display: 'ContractNumber' },
    { key: 'DealerNumber', display: 'DealerNumber' }];

  modifyProps = ['MasterAgreementNumber', 'PrivateLabel', 'ProgramType', 'RelationshipCode', 'LesseeName',
    'LesseeName', 'BillingAddress', 'Phone', 'Fax', 'Email', 'Signer',
    'DocumentProfile', 'InvoiceDescription', 'CollateralCode', 'IndirectBilling', 'InvoiceCode',
    'LateChargeExempt', 'LateChargePercofPmt', 'LeadDays', 'GracePeriod', 'MinimumLateCharge',
    'MaximumLateCharge', 'VendorContractID', 'VendorCustomerID', 'RenewalTerm'
  ];

  private serviceObject = new BehaviorSubject(this.modifiedContract);

  constructor(
    private api: CtsApiService,
    private datasvc: DataService,
    public dialog: MatDialog,
    private cmnfn: CommonfunctionsModule) { }

  ngOnInit() {
    this.showCheckBoxes = true;

    // this.api.GetAllContracts('', '').subscribe((response: any) => {
    //   const res: Contract[] = response;
    //   this.workingContract = res.splice(0, 1)[0];
    //   this.datasvc.changeOriginalContractTriggered(this.workingContract);
    //   this.resultContracts = res;
    //   this.clearAllSelections();
    // });
  }

  applyResult() {
    const res: Contract[] = this.datasvc.respcontracts;
    console.log(res);
    this.workingContract = res.splice(0, 1)[0];
    this.datasvc.changeOriginalContractTriggered(this.workingContract);
    this.resultContracts = res;
    this.clearAllSelections();
  }

  selectAllNewApplication() {
    // this.selectAllApplication = this.workingContract;
  }

  selectAllApplication(c) {
    this.selectAllContract = c;
    this.modifyProps.forEach(k => {
      this.modifiedContract[k] = c[k];
    });
    console.log(this.modifiedContract);
  }

  clearAllSelections() {
    this.selectAllContract = this.workingContract;
    this.modifiedContract = Object.assign({}, this.workingContract);
  }

  checkIfSelected(c, oprop: string): boolean {
    return this.selectAllContract === c;
  }

  propertyChanged(c, oprop: string) {
    this.modifiedContract[oprop] = c[oprop];
  }

  propertyChangedMul(c, oprops: string[]) {
    oprops.map(oprop => {
      this.modifiedContract[oprop] = c[oprop];
    });
  }
  propertyChangedBillingAddress(contract) {
    this.modifiedContract.billToName = contract.billToName;
    this.modifiedContract.billToAddress1 = contract.billToAddress1;
    this.modifiedContract.billToAddress2 = contract.billToAddress2;
    this.modifiedContract.billToCity = contract.billToCity;
    this.modifiedContract.billToState = contract.billToState;
    this.modifiedContract.billToZip = contract.billToZip;
    this.modifiedContract.billToAttnName = contract.billToAttnName;
  }
  sendContractData() {
    this.datasvc.changeContractTriggered(this.modifiedContract);
    const diaCnfg: MatDialogConfig = {
      disableClose: true,
      autoFocus: true
    };
    diaCnfg.data = {
      title: 'Confirmation Page'
    };
    const dialogRef = this.dialog.open(ContractViewerComponent, diaCnfg);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result === 'accept') {
        // todo: sunil - the submission data was accepted, send to API... end of CTS workflow
        this.cmnfn.showAlert(this.dialog, 'Information', '',
          'Contract data submitted', IconTypes.Information,
          AlertTypes.Info);
      }
    });
  }

  sendContractAssetData() {
    this.datasvc.changeContractTriggered(this.modifiedContract);
    const diaCnfg: MatDialogConfig = {
      disableClose: true,
      autoFocus: true
    };
    diaCnfg.data = {
      title: 'Confirmation Page'
    };
    const dialogRef = this.dialog.open(ContractAssetViewerComponent, diaCnfg);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      if (result === 'accept') {
        // todo: sunil - the submission data was accepted, send to API... end of CTS workflow
        this.cmnfn.showAlert(this.dialog, 'Information', '',
          'Contract data submitted', IconTypes.Information,
          AlertTypes.Info);
      }
    });
  }

  ToAddressString(c: Contract): string {
    if (c == null) {
      return '';
    }
    return `${c.lesseeAddress1} ${c.lesseeAddress2}<br/>
    ${ c.lesseeCity}, ${c.lesseeState}, ${c.lesseeZip}<br/>${c.collectionContactName}`;
  }
  compareAddress(c1: Contract, c2: Contract) {
    if (c1.lesseeAddress1 !== c2.lesseeAddress1) { return true; }
    if (c1.lesseeAddress2 !== c2.lesseeAddress2) { return true; }
    if (c1.lesseeCity !== c2.lesseeCity) { return true; }
    if (c1.lesseeState !== c2.lesseeState) { return true; }
    if (c1.lesseeZip !== c2.lesseeZip) { return true; }
    if (c1.collectionContactName !== c2.collectionContactName) { return true; }
  }
}

/*
const w_contract: Contract = {
  ApplicationNumber: '1376455',
  MasterAgreementNumber: '-',
  ContractNumber: '-',
  DealerNumber: '011881-0001',
  InvoicingAs: '-',
  PrivateLabel: true,
  ProgramType: 'Standard',
  RelationshipCode: 'Bills as Advantage Financial Services AFSI',
  BillingAddress: {
    Address2: '',
    City: 'Hoover',
    Contact: 'Accounts Payable',
    State: 'Alabama',
    StreetAddress: '450 Riverchase Pkwy E',
    Zip: '35244-2858'
  },
  LesseeName: 'Blue Cross and Blue Shield of Alabama',
  Phone: '205-301-8263',
  Fax: '',
  Email: '',
  Signer: '',
  PG: '',
  PGRequired: null,
  InvoiceDueDay: null,
  LeaseType: 'Rental Lease',
  Term: 36,
  PurchaseOption: '$1 Option',
  BillingCycle: 'Monthly',
  VariablePayment: null,
  DocumentProfile: '',
  TotalFinanceAmount: 11250,
  PO: '',
  POInfoleaseFlag: null,
  EOTOption: '',
  InsuranceStatus: '',
  InsuranceCodeChangeDate: '',
  InvoiceDescription: '',
  CollateralCode: '',
  IndirectBilling: 'Vendor Bill and Collect',
  InvoiceCode: 'By Contract',
  LateChargeExempt: false,
  LateChargePercofPmt: null,
  LeadDays: null,
  GracePeriod: null,
  MinimumLateCharge: null,
  MaximumLateCharge: null,
  SecuritizationCode: '',
  PermanentExclusionReason: '',
  VendorContractID: '',
  VendorCustomerID: '',
  RenewalTerm: '',
  BookedDate: '',
  InvoiceException: '',
  CMTComments: '',
  ACHCode: null,
  AssetDetail: null,
  AssetLevelBilling: null,
  Consolidated: null,
  CurrentOnly: null,
  ElectronicInvoice: null
};
const r_contract1: Contract = {
  ApplicationNumber: '1375845',
  MasterAgreementNumber: '-',
  ContractNumber: '1083023-081',
  DealerNumber: '011881-0001',
  InvoicingAs: 'AFSI',
  PrivateLabel: true,
  ProgramType: 'Standard',
  RelationshipCode: 'Bills as Advantage Financial Services AFSI',
  BillingAddress: {
    Address2: '',
    City: 'Birmingham',
    Contact: 'Jessica Jones',
    State: 'AL',
    StreetAddress: '4000 Colonnade Pkw',
    Zip: '35243-3212'
  },
  LesseeName: 'Stewart of Alabama',
  Phone: '',
  Fax: '205-220-6620',
  Email: 'jessica.jones@stewartal.com',
  Signer: '',
  PG: '',
  PGRequired: null,
  InvoiceDueDay: 28,
  LeaseType: 'True Lease',
  Term: 36,
  PurchaseOption: '1',
  BillingCycle: 'Monthly',
  VariablePayment: false,
  DocumentProfile: '',
  TotalFinanceAmount: 10007.37,
  PO: '068974',
  POInfoleaseFlag: true,
  EOTOption: 'Vendor Residual',
  InsuranceStatus: 'Executive Waive',
  InsuranceCodeChangeDate: '',
  InvoiceDescription: 'Epson SureColor',
  CollateralCode: '',
  IndirectBilling: 'BillCollect',
  InvoiceCode: 'By Customer',
  LateChargeExempt: false,
  LateChargePercofPmt: 10,
  LeadDays: 45,
  GracePeriod: 4,
  MinimumLateCharge: 26,
  MaximumLateCharge: null,
  SecuritizationCode: '',
  PermanentExclusionReason: '',
  VendorContractID: '',
  VendorCustomerID: '',
  RenewalTerm: '',
  BookedDate: '7/26/18 4:05 PM',
  InvoiceException: '',
  CMTComments: '',
  ACHCode: null,
  AssetDetail: null,
  AssetLevelBilling: null,
  Consolidated: false,
  CurrentOnly: false,
  ElectronicInvoice: null
};
const r_contract2: Contract = {
  ApplicationNumber: '1367805',
  MasterAgreementNumber: '',
  ContractNumber: '1083023-079',
  DealerNumber: '011881-0001',
  InvoicingAs: 'AFSI',
  PrivateLabel: true,
  ProgramType: 'Standard',
  RelationshipCode: 'Bills as Advantage Financial Services AFSI',
  BillingAddress: {
    Address2: '',
    City: 'Birmingham',
    Contact: 'Jessica Jones',
    State: 'AL',
    StreetAddress: '4000 Colonnade Pkw',
    Zip: '35243-3212'
  },
  LesseeName: 'Stewart of Alabama',
  Phone: '205-220-6620',
  Fax: '205-220-6630',
  Email: 'jessica.jones@stewartal.com',
  Signer: 'Toby Lyon, IT Manager',
  PG: 'Bob Marley',
  PGRequired: true,
  InvoiceDueDay: 28,
  LeaseType: 'True Lease',
  Term: 36,
  PurchaseOption: 'Vendor Residual',
  BillingCycle: 'Monthly',
  VariablePayment: false,
  DocumentProfile: 'Cobb - GreatAmerica One or Two Page Agreement - 000347.0001-V/ZG01-01V-02(TL-RL-LP)_0510',
  TotalFinanceAmount: 8951.38,
  PO: '068709',
  POInfoleaseFlag: true,
  EOTOption: 'Vendor Residual',
  InsuranceStatus: 'Executive Waive',
  InsuranceCodeChangeDate: '42865',
  InvoiceDescription: 'Xerox AltaLink',
  CollateralCode: 'Partial Credit Recourse',
  IndirectBilling: 'Vendor Bill and Collect',
  InvoiceCode: 'By Customer',
  LateChargeExempt: false,
  LateChargePercofPmt: 10,
  LeadDays: 45,
  GracePeriod: 4,
  MinimumLateCharge: 26,
  MaximumLateCharge: 50,
  SecuritizationCode: '0006-Management Exclusion',
  PermanentExclusionReason: '',
  VendorContractID: 'ABC12345',
  VendorCustomerID: '12345678901',
  RenewalTerm: 'Month-To-Month',
  BookedDate: '6/28/18 8:33 AM',
  InvoiceException: 'Exception 124',
  CMTComments: `Contract Management Solutions would put text regarding invoicing/contract data here.
  Would want the ability to scroll or expand/collapse the text. `,
  ACHCode: true,
  AssetDetail: true,
  AssetLevelBilling: false,
  Consolidated: false,
  CurrentOnly: false,
  ElectronicInvoice: false
};
const r_contract3: Contract = {
  ApplicationNumber: '1367803',
  MasterAgreementNumber: '',
  ContractNumber: '1083023-078',
  DealerNumber: '011881-0001',
  InvoicingAs: 'AFSI',
  PrivateLabel: true,
  ProgramType: 'Standard',
  RelationshipCode: 'Bills as Advantage Financial Services AFSI',
  BillingAddress: {
    Address2: '',
    City: 'Birmingham',
    Contact: 'Jessica Jones',
    State: 'AL',
    StreetAddress: '205-220-66204000 Colonnade Pkw',
    Zip: '35243-3212'
  },
  LesseeName: 'Stewart of Alabama',
  Phone: '205-220-6620',
  Fax: '205-220-6630',
  Email: 'jessica.jones@stewartal.com',
  Signer: 'Toby Lyon, IT Manager',
  PG: '',
  PGRequired: false,
  InvoiceDueDay: 28,
  LeaseType: 'True Lease',
  Term: 36,
  PurchaseOption: 'Vendor Residual',
  BillingCycle: 'Monthly',
  VariablePayment: false,
  DocumentProfile: 'Cobb TLS - Finance PL One or Two Page Agreement - 000347-0001-V/ZF01-02(CS)_0510',
  TotalFinanceAmount: 15153.48,
  PO: '068770',
  POInfoleaseFlag: true,
  EOTOption: 'Vendor Residual',
  InsuranceStatus: 'Executive Waive',
  InsuranceCodeChangeDate: '42865',
  InvoiceDescription: 'Xerox AltaLink',
  CollateralCode: 'Partial Credit Recourse',
  IndirectBilling: 'Vendor Bill and Collect',
  InvoiceCode: 'By Customer',
  LateChargeExempt: false,
  LateChargePercofPmt: 10,
  LeadDays: 45,
  GracePeriod: 4,
  MinimumLateCharge: 26,
  MaximumLateCharge: 50,
  SecuritizationCode: '0006-Management Exclusion',
  PermanentExclusionReason: '',
  VendorContractID: 'ABC12345',
  VendorCustomerID: '12345678901',
  RenewalTerm: 'Month-To-Month',
  BookedDate: '7/3/18 2:27 PM',
  InvoiceException: 'Exception 124',
  CMTComments: `Contract Management Solutions would put text regarding invoicing/contract data here.
  Would want the ability to scroll or expand/collapse the text. `,
  ACHCode: true,
  AssetDetail: false,
  AssetLevelBilling: true,
  Consolidated: false,
  CurrentOnly: false,
  ElectronicInvoice: false
};
const r_contract4: Contract = {
  ApplicationNumber: '1361206',
  MasterAgreementNumber: '',
  ContractNumber: '1083023-080',
  DealerNumber: '011881-0001',
  InvoicingAs: 'AFSI',
  PrivateLabel: true,
  ProgramType: 'Standard',
  RelationshipCode: 'Bills as Advantage Financial Services AFSI',
  LesseeName: 'Stewart of Alabama',
  BillingAddress: {
    Address2: '',
    City: 'Birmingham',
    Contact: 'Jessica Jones',
    State: 'AL',
    StreetAddress: '205-220-66204000 Colonnade Pkw',
    Zip: '35243-3212'
  },
  Phone: '205-220-6620',
  Fax: '205-220-6640',
  Email: 'jessica.jones@stewartal.com',
  Signer: 'Toby Lyon, IT Manager',
  PG: 'Bob Marley',
  PGRequired: true,
  InvoiceDueDay: 28,
  LeaseType: 'True Lease',
  Term: 36,
  PurchaseOption: 'Vendor Residual',
  BillingCycle: 'Monthly',
  VariablePayment: false,
  DocumentProfile: 'Cobb - GreatAmerica One or Two Page Agreement - 000347.0001-V/ZG01-01V-02(TL-RL-LP)_0510',
  TotalFinanceAmount: 11189.62,
  PO: '068644',
  POInfoleaseFlag: true,
  EOTOption: 'Vendor Residual',
  InsuranceStatus: 'Executive Waive',
  InsuranceCodeChangeDate: '43237',
  InvoiceDescription: 'Xerox AltaLink C8035 (SN: 2TX059024: CN02342)',
  CollateralCode: 'Doc Recourse',
  IndirectBilling: 'Vendor Bill and Collect',
  InvoiceCode: 'By Customer',
  LateChargeExempt: false,
  LateChargePercofPmt: 10,
  LeadDays: 45,
  GracePeriod: 4,
  MinimumLateCharge: 26,
  MaximumLateCharge: 50,
  SecuritizationCode: '0001-Permanent Exclusion',
  PermanentExclusionReason: 'No HHW',
  VendorContractID: 'CDE45678-0156',
  VendorCustomerID: '1098765431',
  RenewalTerm: '36',
  BookedDate: '7/3/18 2:27 PM',
  InvoiceException: 'Exception because I said so ',
  CMTComments: `Contract Management Solutions would put text regarding invoicing/contract data here.
  Would want the ability to scroll or expand/collapse the text. `,
  ACHCode: false,
  AssetDetail: false,
  AssetLevelBilling: false,
  Consolidated: false,
  CurrentOnly: false,
  ElectronicInvoice: true
};
*/
