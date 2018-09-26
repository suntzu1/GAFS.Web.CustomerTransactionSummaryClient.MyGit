import { Charge, Payment, ChargeTypeEnum } from 'src/app/Models/payment';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Quote } from 'src/app/Models/quote';

@Component({
  selector: 'cts-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  enumkeys = Object.keys(ChargeTypeEnum).filter(Number);
  displayedColumns = [
    { key: 'Type', display: 'Charge Type', type: 'enum', source: ChargeTypeEnum, keys: this.enumkeys },
    { key: 'Description', display: 'Description', type: 'text', source: null, keys: null },
    { key: 'Amount', display: 'Amount ($)', type: 'number', source: null, keys: null }];
  quotedispColumns = [
    { key: 'ContractNumber', display: 'Contract ID', type: 'text', source: null, keys: null },
    { key: 'QuoteID', display: 'Quote ID', type: 'text', source: null, keys: null },
    { key: 'UpgradeAmount', display: 'Upgrade Amount ($)', type: 'number', source: null, keys: null }];
  allpayments: any[] = [];
  showCheckBoxes: boolean = false;
  showmc: boolean = false;


  dataSource: any;

  public newApplicCharges: Charge[];
  addNewCharge: Charge;
  public quotes: Quote[] = [];

  constructor() {
    // this.enumkeys = Object.keys(ChargeTypeEnum).filter(Number);
  }

  ngOnInit() {
    this.addNewCharge = {
      Amount: 0,
      Description: '',
      Type: ChargeTypeEnum.Maintenance
    };
    this.allpayments.push(pay1);
    this.allpayments.push(pay2);
    this.allpayments.push(pay3);
    this.newApplicCharges = [{
      Amount: 25,
      Description: 'Black and White',
      Type: ChargeTypeEnum.Payment
    }];
    this.quotes.push(quote1);
    this.quotes.push(quote2);
    // this.newApplicCharges = [];
    this.dataSource = new MatTableDataSource(this.newApplicCharges);
  }

  sumMaintenance(m: Charge[]) {
    if (m || m.length > 0) {
      return m.map(i => i.Amount).reduce((a, b) => a + b, 0);
    }
    return 0;
  }

  showMaint() {
    this.showmc = !this.showmc;
  }
  addcharge() {
    this.newApplicCharges.push(this.addNewCharge);
    this.dataSource = new MatTableDataSource(this.newApplicCharges);
    this.addNewCharge = {
      Amount: 0,
      Description: '',
      Type: ChargeTypeEnum.Maintenance
    };
  }
}

const pay1: Payment = {
  ContractNumber: '1083023-081',
  DealerNumber: '011881-0001',
  Tpb: {
    Iir: {
      RentPreTax: 168.13,
      Maintenance: [{
        Amount: 25,
        Description: 'Black and White',
        Type: ChargeTypeEnum.Maintenance
      },
      {
        Amount: 5,
        Description: 'Servicing',
        Type: ChargeTypeEnum.Maintenance
      },
      {
        Amount: 3,
        Description: 'Fuse',
        Type: ChargeTypeEnum.Maintenance
      }],
      SalesTaxMaint: {
        StateCode: 'OH',
        Percentage: 6.75,
        Amount: 2.23
      },
      Charges: []
    },
    Niir: {
      InsuranceCharge: {
        Amount: 7.14,
        Description: 'Insurance Charge',
        Type: ChargeTypeEnum.Insurance
      },
      Charges: []
    }
  }
};
const pay2: Payment = {
  ContractNumber: '1083023-079',
  DealerNumber: '011881-0001',
  Tpb: {
    Iir: {
      RentPreTax: 1988.13,
      Maintenance: [],
      SalesTaxMaint: {
        StateCode: 'OH',
        Percentage: 6.75,
        Amount: 20.23
      },
      Charges: []
    },
    Niir: {
      InsuranceCharge: {
        Amount: 6.25,
        Description: 'Insurance Charge',
        Type: ChargeTypeEnum.Insurance
      },
      Charges: []
    }
  }
};
const pay3: Payment = {
  ContractNumber: '1083025-081',
  DealerNumber: '011881-0001',
  Tpb: {
    Iir: {
      RentPreTax: 268.99,
      Maintenance: [{
        Amount: 32,
        Description: 'Color',
        Type: ChargeTypeEnum.Maintenance
      },
      {
        Amount: 15,
        Description: 'Servicing',
        Type: ChargeTypeEnum.Maintenance
      },
      {
        Amount: 3,
        Description: 'Fuse',
        Type: ChargeTypeEnum.Maintenance
      }],
      SalesTaxMaint: {
        StateCode: 'OH',
        Percentage: 6.75,
        Amount: 6.50
      },
      Charges: []
    },
    Niir: {
      InsuranceCharge: {
        Amount: 7.14,
        Description: 'Insurance Charge',
        Type: ChargeTypeEnum.Insurance
      },
      Charges: []
    }
  }
};
const quote1: Quote = {
  ContractNumber: '1234567-007',
  QuoteID: '654321',
  UpgradeAmount: 85.50
};
const quote2: Quote = {
  ContractNumber: '1260240-002',
  QuoteID: '668456',
  UpgradeAmount: 122.00
};


