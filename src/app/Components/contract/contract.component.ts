import { Component, OnInit } from '@angular/core';
import { Address } from '../../Models/address';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CtsApiService } from '../../Services/cts-api.service';
import { DataService } from '../../Services/data.service';
import { BehaviorSubject } from 'rxjs';
import { ContractViewerComponent } from '../contract-viewer/contract-viewer.component';
import { IconTypes, AlertTypes } from '../CustomAlert/customalert.component';
import { CommonfunctionsModule } from '../../commonfunctions/commonfunctions.module';
import { ContractAssetViewerComponent } from '../contract-asset-viewer/contract-asset-viewer.component';
import { Contract } from 'src/app/Models/cts-api.contract';
import { Guarantor, InsuranceRecord } from 'src/app/Models/cts-api';


@Component({
  selector: 'cts-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css', '../datagridstyle.css']
})
export class ContractComponent implements OnInit {
  workingContract: any = {};
  resultContracts: Contract[] = [];
  showCheckBoxes: boolean;
  selectAllContract: Contract;

  displayedCols: [
    { key: 'ApplicationNumber', display: 'ApplicationNumber' },
    { key: 'MasterAgreementNumber', display: 'MasterAgreementNumber' },
    { key: 'ContractNumber', display: 'ContractNumber' },
    { key: 'DealerNumber', display: 'DealerNumber' }];

  modifyProps = ['masterAgreementNumber', 'privateLabel', 'programTypeId', 'programTypeDesc', 'relationshipId', 'relationshipDesc', 'customerName',
    'lesseeName',
    'BillingAddress', 'billToAddress1',
    'billToAddress2',
    'billToAddress3',
    'billToAttnName',
    'billToCity',
    'billToCountry',
    'billToName',
    'billToState',
    'billToZip',
    'lesseePhone', 'lesseeFax', 'lesseeEmail', 'requiredSigner',
    'documentProfileName', 'invoiceDescription', 'collateralCodeId', 'collateralCodeDesc', 'indirectBilling', 'indirectBillingDesc', 'invoiceCode', 'invoiceCodeDesc',
    'lateChargeExempt', 'lateChargeRate', 'leadDays', 'gracePeriod', 'lateChargeMin',
    'lateChargeMax', 'vendorContractNumber', 'vendorCustomerNumber', 'renewalTermLength'
  ];

  private serviceObject = new BehaviorSubject(this.datasvc.modifiedContract);
  checkBoxArr: number[] = [];
  constructor(
    private api: CtsApiService,
    private datasvc: DataService,
    public dialog: MatDialog,
    private cmnfn: CommonfunctionsModule) {
  }

  ngOnInit() {
    this.showCheckBoxes = this.datasvc.showCheckBoxes;
    if (!this.datasvc.checkBoxArr) { this.datasvc.checkBoxArr = this.checkBoxArr; }
  }

  storeState() {
    if (this.checkBoxArr && this.checkBoxArr.length > 0) { this.datasvc.checkBoxArr = this.checkBoxArr; }
  }

  applyResult() {
    const res: Contract[] = this.datasvc.respcontracts;
    // if (res.length > 0) {
    // this.workingContract = res.splice(0, 1)[0];
    // } else {
    //   this.workingContract = {};
    // }
    if (this.datasvc.loadedApplication && this.datasvc.loadedApplication.applications.length > 0) {
      this.api.ConvertApplicationToContract(this.workingContract, this.datasvc.loadedApplication.applications[0]);
    } else {
      this.workingContract = {};
    }
    this.datasvc.changeOriginalContractTriggered(this.workingContract);
    this.datasvc.actualContract = this.workingContract;
    this.resultContracts = res;
    this.selectAllContract = this.workingContract;
    if (!this.datasvc.modifiedContract) { this.datasvc.modifiedContract = Object.assign({}, this.workingContract); }
    if (this.datasvc.checkBoxArr.length === 0 && this.checkBoxArr.length === 0) {
      for (let x = 0; x <= 30; ++x) {
        this.datasvc.checkBoxArr[x] = -1;
      }
    }
    this.checkBoxArr = this.datasvc.checkBoxArr;
  }

  selectAllNewApplication() {
  }

  selectAllApplication(c, i) {
    this.selectAllContract = c;
    this.modifyProps.forEach(k => {
      this.datasvc.modifiedContract[k] = c[k];
    });
    for (let x = 0; x <= 30; ++x) {
      this.checkBoxArr[x] = i;
    }
  }

  clearAllSelections() {
    this.selectAllContract = this.workingContract;
    this.datasvc.modifiedContract = Object.assign({}, this.workingContract);
    for (let x = 0; x <= 30; ++x) {
      this.checkBoxArr[x] = -1;
    }
  }

  propertyChanged(c, oprop: string, r, i) {
    this.datasvc.modifiedContract[oprop] = c[oprop];
    this.checkBoxArr[r] = i;
  }

  propertyChangedMul(c, oprops: string[], r, i) {
    this.checkBoxArr[r] = i;
    oprops.map(oprop => {
      this.datasvc.modifiedContract[oprop] = c[oprop];
    });
  }

  propertyChangedBillingAddress(contract, r, i) {
    this.checkBoxArr[r] = i;
    this.datasvc.modifiedContract.billToName = contract.billToName;
    this.datasvc.modifiedContract.billToAddress1 = contract.billToAddress1;
    this.datasvc.modifiedContract.billToAddress2 = contract.billToAddress2;
    this.datasvc.modifiedContract.billToAddress3 = contract.billToAddress3;
    this.datasvc.modifiedContract.billToCity = contract.billToCity;
    this.datasvc.modifiedContract.billToState = contract.billToState;
    this.datasvc.modifiedContract.billToZip = contract.billToZip;
    this.datasvc.modifiedContract.billToCountry = contract.billToCountry;
    this.datasvc.modifiedContract.billToAttnName = contract.billToAttnName;
  }

  sendContractData() {
    this.datasvc.changeContractTriggered(this.datasvc.modifiedContract);
    const diaCnfg: MatDialogConfig = {
      disableClose: true,
      autoFocus: true
    };
    diaCnfg.data = {
      title: 'Confirmation Page'
    };
    const dialogRef = this.dialog.open(ContractViewerComponent, diaCnfg);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        // todo: sunil - the submission data was accepted, send to API... end of CTS workflow
        const putApp: any = {};
        this.api.ConvertContractToApplication(putApp, this.datasvc.modifiedContract);
        this.api.PutUpdateApplication(putApp).subscribe(res => {
          this.cmnfn.showAlert(this.dialog, 'Information', '',
            'Contract data submitted', IconTypes.Information,
            AlertTypes.Info);
        });
      }
    });
  }

  sendContractAssetData() {
    this.datasvc.changeContractTriggered(this.datasvc.modifiedContract);
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
    const add2 = c.billToAddress2 && c.billToAddress2.length > 0 ? '<br/>' + c.billToAddress2 : '';
    return `${c.billToAddress1}${add2}<br/>
    ${ c.billToCity}, ${c.billToState}, ${c.billToZip}<br/>${c.billToAttnName}`;
  }

  compareAddress(c1: Contract, c2: Contract) {
    if (c1.billToAddress1 !== c2.billToAddress1) { return true; }
    if (c1.billToAddress2 !== c2.billToAddress2) { return true; }
    if (c1.billToCity !== c2.billToCity) { return true; }
    if (c1.billToState !== c2.billToState) { return true; }
    if (c1.billToZip !== c2.billToZip) { return true; }
    if (c1.billToAttnName !== c2.billToAttnName) { return true; }
  }

  getGuarantorData(g: Guarantor): string {
    let gstr = '';
    if (g.guarantorTypeDesc && g.guarantorTypeDesc.length > 0) { gstr += g.guarantorTypeDesc + ' '; }
    if (g.guarantorName && g.guarantorName.length > 0) { gstr += g.guarantorName + ' '; }
    if (g.guarantorAddress1 && g.guarantorAddress1.length > 0) { gstr += g.guarantorAddress1 + ' '; }
    if (g.guarantorAddress2 && g.guarantorAddress2.length > 0) { gstr += g.guarantorAddress2 + ' '; }
    if (g.guarantorCity && g.guarantorCity.length > 0) { gstr += g.guarantorCity + ' '; }
    if (g.guarantorState && g.guarantorState.length > 0) { gstr += g.guarantorState + ' '; }
    if (g.guarantorZip && g.guarantorZip.length > 0) { gstr += g.guarantorZip; }
    return gstr;
  }

  getInusranceData(i: InsuranceRecord): string {
    let istr = '';
    if (i.insuranceCodeDesc && i.insuranceCodeDesc.length > 0) { istr += i.insuranceCodeDesc + ', '; }
    if (i.insuranceCarrierName && i.insuranceCarrierName.length > 0) { istr += i.insuranceCarrierName + ', '; }
    if (i.insurancePolicyNumber && i.insurancePolicyNumber.length > 0) { istr += i.insurancePolicyNumber; }
    return istr;
  }
}
