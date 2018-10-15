import { Address } from './address';
import { Asset } from './asset';

// export interface Contract {
//     ApplicationNumber: string;
//     MasterAgreementNumber: string;
//     ContractNumber: string;
//     DealerNumber: string;
//     InvoicingAs: string;
//     PrivateLabel: boolean;
//     ProgramType: string;
//     RelationshipCode: string;
//     LesseeName: string;
//     BillingAddress: Address;
//     Phone: string;
//     Fax: string;
//     Email: string;
//     Signer: string;
//     PG: string;
//     PGRequired: boolean;
//     InvoiceDueDay: number;
//     LeaseType: string;
//     Term: number;
//     PurchaseOption: string;
//     BillingCycle: string;
//     VariablePayment: boolean;
//     DocumentProfile: string;
//     TotalFinanceAmount: number;
//     PO: string;
//     POInfoleaseFlag: boolean;
//     EOTOption: string;
//     InsuranceStatus: string;
//     InsuranceCodeChangeDate: string;
//     InvoiceDescription: string;
//     CollateralCode: string;
//     IndirectBilling: string;
//     InvoiceCode: string;
//     LateChargeExempt: boolean;
//     LateChargePercofPmt: number;
//     LeadDays: number;
//     GracePeriod: number;
//     MinimumLateCharge: number;
//     MaximumLateCharge: number;
//     SecuritizationCode: string;
//     PermanentExclusionReason: string;
//     VendorContractID: string;
//     VendorCustomerID: string;
//     RenewalTerm: string;
//     BookedDate: string;
//     InvoiceException: string;
//     CMTComments: string;
//     ACHCode: boolean;
//     AssetDetail: boolean;
//     AssetLevelBilling: boolean;
//     Consolidated: boolean;
//     CurrentOnly: boolean;
//     ElectronicInvoice: boolean;
// }

export class ContractAssets {
    ContractNumber: string;
    Assets: Asset[];
}
