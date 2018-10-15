declare module CtsApi {

    export interface Error {
        code: number;
        message: string;
    }

    export interface Guarantor {
        guarantorAddress1: string;
        guarantorAddress2: string;
        guarantorAddress3: string;
        guarantorCity: string;
        guarantorName: string;
        guarantorPhone: string;
        guarantorState: string;
        guarantorTitle: string;
        guarantorTypeDesc: string;
        guarantorTypeID: number;
        guarantorZip: string;
    }

    export interface InsuranceRecord {
        insuranceCancelDate: string;
        insuranceCarrierContact: string;
        insuranceCarrierFax: string;
        insuranceCarrierName: string;
        insuranceCarrierPhone: string;
        insuranceCode: number;
        insuranceCodeDesc: string;
        insuranceEffectiveDate: string;
        insuranceExpirationDate: string;
        insurancePolicyNumber: string;
    }

    export interface Payment {
        payableCategory: string;
        payableCheckAmount: number;
        payableCheckDate: string;
        payableCheckNumber: number;
        payableDealerCCAN: string;
        payableInvoiceAmount: number;
        payableInvoiceStatus: string;
        payableMiscGLCode: string;
        payableName: string;
        payablePayCode: string;
    }

    export interface ContractBase {
        contractId: string;
        applicationId: number;
        vendorId: string;
        vendorName: string;
    }

    export interface ContractAsset extends ContractBase {
        assets: Asset[];
    }

    export interface ContractInfo {
        customerId: number;
        customerName: string;
        customerDBA: string;
        contracts: Contract[];
    }

    export interface AssetInfo {
        customerId: number;
        customerName: string;
        customerDBA: string;
        contracts: ContractAsset[];
    }

    export interface Message {
        contractInfo: ContractInfo;
        assetInfo: AssetInfo;
    }

    export interface ApiResponse {
        application: string;
        version: string;
        environment: string;
        timestamp: string;
        rootCorrelationId: string;
        correlationId: string;
        auditUser: string;
        elapsed: number;
        priority: string;
        error: Error;
        message: Message;
    }

    export interface OtherCost {
        otherCostGLCode: string;
        otherCostGLDescription: string;
        otherCostFinanced: boolean;
        otherCostPaidById: string;
        otherCostPaidByDescription: string;
        otherCostAmount: number;
        otherCostIncludeInPropertyTax: boolean;
    }

    export interface LocationRecord {
        equipmentAddress1: string;
        equipmentAddress2: string;
        equipmentCity: string;
        equipmentState: string;
        equipmentCountry: string;
        equipmentZip: string;
        stateTaxId: string;
        stateTaxDescription: string;
        miscellaneousStateTaxId: string;
        miscellaneousStateTaxDescription: string;
        lateChargeStateTaxId: string;
        lateChargeStateTaxDescription: string;
        stateTaxRate: number;
        countyTaxId: string;
        countyTaxDescription: string;
        miscellaneousCountyTaxId: string;
        miscellaneousCountyTaxDescription: string;
        lateChargeCountyTaxId: string;
        lateChargeCountyTaxDescription: string;
        countyTaxRate: number;
        cityTaxId: string;
        cityTaxDescription: string;
        miscellaneousCityTaxId: string;
        miscellaneousCityTaxDescription: string;
        lateChargeCityTaxId: string;
        lateChargeCityTaxDescription: string;
        cityTaxRate: number;
        countyTransitTaxRate: number;
        cityTransitTaxRate: number;
    }

    export interface ApplicationUpdate {
        collateralCode: string;
        docProfile: number;
        gracePeriod: number;
        indirectBilling: number;
        invoiceCode: string;
        invoiceDesc: string;
        lateChargeExempt: boolean;
        lateChargeMax: number;
        lateChargeMin: number;
        lateChargePctOfPmt: number;
        leadDays: number;
        lesseeAddress1: string;
        lesseeAddress2: string;
        lesseeAddress3: string;
        lesseeAttnName: string;
        lesseeCity: string;
        lesseeEmail: string;
        lesseeFax: string;
        lesseeName: string;
        lesseePhone: string;
        masterAgreementNumber: string;
        privateLabel: boolean;
        programType: string;
        relationshipCode: string;
        renewalTerm: number;
        signerUserNumber: number;
        vendorContractId: string;
        vendorCustomerId: string;
    }
}
