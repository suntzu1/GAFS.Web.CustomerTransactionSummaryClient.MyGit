import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('');
  currentMesssage = this.messageSource.asObservable();
  constructor() { }

  changeContractTriggered(payload: any) {
    this.messageSource.next(payload);
  }

  changeAssetTriggered(payload: any) {
    this.messageSource.next(payload);
  }
}
















// keep below: just as reference, no longer used in code


// import { Contract } from '../Models/contract';


// export class TempData {
//   w_contract: Contract = {
//     ApplicationNumber: '1376455',
//     MasterAgreementNumber: '-',
//     ContractNumber: '-',
//     DealerNumber: '011881-0001',
//     InvoicingAs: '-',
//     PrivateLabel: true,
//     ProgramType: 'Standard',
//     RelationshipCode: 'Bills as Advantage Financial Services AFSI',
//     BillingAddress: {
//       Address2: '',
//       City: 'Hoover',
//       Contact: 'Accounts Payable',
//       State: 'Alabama',
//       StreetAddress: '450 Riverchase Pkwy E',
//       Zip: '35244-2858'
//     },
//     LesseeName: 'Blue Cross and Blue Shield of Alabama',
//     Phone: '205-301-8263',
//     Fax: '',
//     Email: '',
//     Signer: '',
//     PG: '',
//     PGRequired: null,
//     InvoiceDueDay: null,
//     LeaseType: 'Rental Lease',
//     Term: 36,
//     PurchaseOption: '$1 Option',
//     BillingCycle: 'Monthly',
//     VariablePayment: null,
//     DocumentProfile: '',
//     TotalFinanceAmount: 11250,
//     PO: '',
//     POInfoleaseFlag: null,
//     EOTOption: '',
//     InsuranceStatus: '',
//     InsuranceCodeChangeDate: '',
//     InvoiceDescription: '',
//     CollateralCode: '',
//     IndirectBilling: 'Vendor Bill and Collect',
//     InvoiceCode: 'By Contract',
//     LateChargeExempt: false,
//     LateChargePercofPmt: null,
//     LeadDays: null,
//     GracePeriod: null,
//     MinimumLateCharge: null,
//     MaximumLateCharge: null,
//     SecuritizationCode: '',
//     PermanentExclusionReason: '',
//     VendorContractID: '',
//     VendorCustomerID: '',
//     RenewalTerm: '',
//     BookedDate: '',
//     InvoiceException: '',
//     CMTComments: '',
//     ACHCode: null,
//     AssetDetail: null,
//     AssetLevelBilling: null,
//     Consolidated: null,
//     CurrentOnly: null,
//     ElectronicInvoice: null
//   };
//   r_contract1: Contract = {
//     ApplicationNumber: '1375845',
//     MasterAgreementNumber: '-',
//     ContractNumber: '1083023-081',
//     DealerNumber: '011881-0001',
//     InvoicingAs: 'AFSI',
//     PrivateLabel: true,
//     ProgramType: 'Standard',
//     RelationshipCode: 'Bills as Advantage Financial Services AFSI',
//     BillingAddress: {
//       Address2: '',
//       City: 'Birmingham',
//       Contact: 'Jessica Jones',
//       State: 'AL',
//       StreetAddress: '4000 Colonnade Pkw',
//       Zip: '35243-3212'
//     },
//     LesseeName: 'Stewart of Alabama',
//     Phone: '',
//     Fax: '205-220-6620',
//     Email: 'jessica.jones@stewartal.com',
//     Signer: '',
//     PG: '',
//     PGRequired: null,
//     InvoiceDueDay: 28,
//     LeaseType: 'True Lease',
//     Term: 36,
//     PurchaseOption: '1',
//     BillingCycle: 'Monthly',
//     VariablePayment: false,
//     DocumentProfile: '',
//     TotalFinanceAmount: 10007.37,
//     PO: '068974',
//     POInfoleaseFlag: true,
//     EOTOption: 'Vendor Residual',
//     InsuranceStatus: 'Executive Waive',
//     InsuranceCodeChangeDate: '',
//     InvoiceDescription: 'Epson SureColor',
//     CollateralCode: '',
//     IndirectBilling: 'BillCollect',
//     InvoiceCode: 'By Customer',
//     LateChargeExempt: false,
//     LateChargePercofPmt: 10,
//     LeadDays: 45,
//     GracePeriod: 4,
//     MinimumLateCharge: 26,
//     MaximumLateCharge: null,
//     SecuritizationCode: '',
//     PermanentExclusionReason: '',
//     VendorContractID: '',
//     VendorCustomerID: '',
//     RenewalTerm: '',
//     BookedDate: '7/26/18 4:05 PM',
//     InvoiceException: '',
//     CMTComments: '',
//     ACHCode: null,
//     AssetDetail: null,
//     AssetLevelBilling: null,
//     Consolidated: false,
//     CurrentOnly: false,
//     ElectronicInvoice: null
//   };
//   r_contract2: Contract = {
//     ApplicationNumber: '1367805',
//     MasterAgreementNumber: '',
//     ContractNumber: '1083023-079',
//     DealerNumber: '011881-0001',
//     InvoicingAs: 'AFSI',
//     PrivateLabel: true,
//     ProgramType: 'Standard',
//     RelationshipCode: 'Bills as Advantage Financial Services AFSI',
//     BillingAddress: {
//       Address2: '',
//       City: 'Birmingham',
//       Contact: 'Jessica Jones',
//       State: 'AL',
//       StreetAddress: '4000 Colonnade Pkw',
//       Zip: '35243-3212'
//     },
//     LesseeName: 'Stewart of Alabama',
//     Phone: '205-220-6620',
//     Fax: '205-220-6630',
//     Email: 'jessica.jones@stewartal.com',
//     Signer: 'Toby Lyon, IT Manager',
//     PG: 'Bob Marley',
//     PGRequired: true,
//     InvoiceDueDay: 28,
//     LeaseType: 'True Lease',
//     Term: 36,
//     PurchaseOption: 'Vendor Residual',
//     BillingCycle: 'Monthly',
//     VariablePayment: false,
//     DocumentProfile: 'Cobb - GreatAmerica One or Two Page Agreement - 000347.0001-V/ZG01-01V-02(TL-RL-LP)_0510',
//     TotalFinanceAmount: 8951.38,
//     PO: '068709',
//     POInfoleaseFlag: true,
//     EOTOption: 'Vendor Residual',
//     InsuranceStatus: 'Executive Waive',
//     InsuranceCodeChangeDate: '42865',
//     InvoiceDescription: 'Xerox AltaLink',
//     CollateralCode: 'Partial Credit Recourse',
//     IndirectBilling: 'Vendor Bill and Collect',
//     InvoiceCode: 'By Customer',
//     LateChargeExempt: false,
//     LateChargePercofPmt: 10,
//     LeadDays: 45,
//     GracePeriod: 4,
//     MinimumLateCharge: 26,
//     MaximumLateCharge: 50,
//     SecuritizationCode: '0006-Management Exclusion',
//     PermanentExclusionReason: '',
//     VendorContractID: 'ABC12345',
//     VendorCustomerID: '12345678901',
//     RenewalTerm: 'Month-To-Month',
//     BookedDate: '6/28/18 8:33 AM',
//     InvoiceException: 'Exception 124',
//     CMTComments: `Contract Management Solutions would put text regarding invoicing/contract data here.
//     Would want the ability to scroll or expand/collapse the text. `,
//     ACHCode: true,
//     AssetDetail: true,
//     AssetLevelBilling: false,
//     Consolidated: false,
//     CurrentOnly: false,
//     ElectronicInvoice: false
//   };
//   r_contract3: Contract = {
//     ApplicationNumber: '1367803',
//     MasterAgreementNumber: '',
//     ContractNumber: '1083023-078',
//     DealerNumber: '011881-0001',
//     InvoicingAs: 'AFSI',
//     PrivateLabel: true,
//     ProgramType: 'Standard',
//     RelationshipCode: 'Bills as Advantage Financial Services AFSI',
//     BillingAddress: {
//       Address2: '',
//       City: 'Birmingham',
//       Contact: 'Jessica Jones',
//       State: 'AL',
//       StreetAddress: '205-220-66204000 Colonnade Pkw',
//       Zip: '35243-3212'
//     },
//     LesseeName: 'Stewart of Alabama',
//     Phone: '205-220-6620',
//     Fax: '205-220-6630',
//     Email: 'jessica.jones@stewartal.com',
//     Signer: 'Toby Lyon, IT Manager',
//     PG: '',
//     PGRequired: false,
//     InvoiceDueDay: 28,
//     LeaseType: 'True Lease',
//     Term: 36,
//     PurchaseOption: 'Vendor Residual',
//     BillingCycle: 'Monthly',
//     VariablePayment: false,
//     DocumentProfile: 'Cobb TLS - Finance PL One or Two Page Agreement - 000347-0001-V/ZF01-02(CS)_0510',
//     TotalFinanceAmount: 15153.48,
//     PO: '068770',
//     POInfoleaseFlag: true,
//     EOTOption: 'Vendor Residual',
//     InsuranceStatus: 'Executive Waive',
//     InsuranceCodeChangeDate: '42865',
//     InvoiceDescription: 'Xerox AltaLink',
//     CollateralCode: 'Partial Credit Recourse',
//     IndirectBilling: 'Vendor Bill and Collect',
//     InvoiceCode: 'By Customer',
//     LateChargeExempt: false,
//     LateChargePercofPmt: 10,
//     LeadDays: 45,
//     GracePeriod: 4,
//     MinimumLateCharge: 26,
//     MaximumLateCharge: 50,
//     SecuritizationCode: '0006-Management Exclusion',
//     PermanentExclusionReason: '',
//     VendorContractID: 'ABC12345',
//     VendorCustomerID: '12345678901',
//     RenewalTerm: 'Month-To-Month',
//     BookedDate: '7/3/18 2:27 PM',
//     InvoiceException: 'Exception 124',
//     CMTComments: `Contract Management Solutions would put text regarding invoicing/contract data here.
//     Would want the ability to scroll or expand/collapse the text. `,
//     ACHCode: true,
//     AssetDetail: false,
//     AssetLevelBilling: true,
//     Consolidated: false,
//     CurrentOnly: false,
//     ElectronicInvoice: false
//   };
//   r_contract4: Contract = {
//     ApplicationNumber: '1361206',
//     MasterAgreementNumber: '',
//     ContractNumber: '1083023-080',
//     DealerNumber: '011881-0001',
//     InvoicingAs: 'AFSI',
//     PrivateLabel: true,
//     ProgramType: 'Standard',
//     RelationshipCode: 'Bills as Advantage Financial Services AFSI',
//     LesseeName: 'Stewart of Alabama',
//     BillingAddress: {
//       Address2: '',
//       City: 'Birmingham',
//       Contact: 'Jessica Jones',
//       State: 'AL',
//       StreetAddress: '205-220-66204000 Colonnade Pkw',
//       Zip: '35243-3212'
//     },
//     Phone: '205-220-6620',
//     Fax: '205-220-6640',
//     Email: 'jessica.jones@stewartal.com',
//     Signer: 'Toby Lyon, IT Manager',
//     PG: 'Bob Marley',
//     PGRequired: true,
//     InvoiceDueDay: 28,
//     LeaseType: 'True Lease',
//     Term: 36,
//     PurchaseOption: 'Vendor Residual',
//     BillingCycle: 'Monthly',
//     VariablePayment: false,
//     DocumentProfile: 'Cobb - GreatAmerica One or Two Page Agreement - 000347.0001-V/ZG01-01V-02(TL-RL-LP)_0510',
//     TotalFinanceAmount: 11189.62,
//     PO: '068644',
//     POInfoleaseFlag: true,
//     EOTOption: 'Vendor Residual',
//     InsuranceStatus: 'Executive Waive',
//     InsuranceCodeChangeDate: '43237',
//     InvoiceDescription: 'Xerox AltaLink C8035 (SN: 2TX059024: CN02342)',
//     CollateralCode: 'Doc Recourse',
//     IndirectBilling: 'Vendor Bill and Collect',
//     InvoiceCode: 'By Customer',
//     LateChargeExempt: false,
//     LateChargePercofPmt: 10,
//     LeadDays: 45,
//     GracePeriod: 4,
//     MinimumLateCharge: 26,
//     MaximumLateCharge: 50,
//     SecuritizationCode: '0001-Permanent Exclusion',
//     PermanentExclusionReason: 'No HHW',
//     VendorContractID: 'CDE45678-0156',
//     VendorCustomerID: '1098765431',
//     RenewalTerm: '36',
//     BookedDate: '7/3/18 2:27 PM',
//     InvoiceException: 'Exception because I said so ',
//     CMTComments: `Contract Management Solutions would put text regarding invoicing/contract data here.
//     Would want the ability to scroll or expand/collapse the text. `,
//     ACHCode: false,
//     AssetDetail: false,
//     AssetLevelBilling: false,
//     Consolidated: false,
//     CurrentOnly: false,
//     ElectronicInvoice: true
//   };

//   contractsdata = [
//     this.w_contract, this.r_contract1, this.r_contract2, this.r_contract3, this.r_contract4
//   ];

//   GetContracts() {
//     return this.contractsdata;
//   }
// }
