export interface Payment {
    ContractNumber: string;
    DealerNumber: string;
    Tpb: TotalPaymentBreakout;
}

export interface TotalPaymentBreakout {
    Iir: IncludedInRent;
    Niir: NotIncludedInRent;
}

export interface IncludedInRent {
    RentPreTax: number;
    Maintenance: Charge[];
    SalesTaxMaint: SalesTax;
    Charges: Charge[];
}

export interface NotIncludedInRent {
    InsuranceCharge: Charge;
    Charges: Charge[];
}

export interface Charge {
    Type: ChargeTypeEnum;
    Description: string;
    Amount: number;
}

export interface SalesTax {
    StateCode: string;
    Percentage: number;
    Amount: number;
}

export enum ChargeTypeEnum {
    Maintenance = 1,
    Payment = 2,
    Insurance = 3,
    Other = 4
}
