import { OtherCost, LocationRecord } from "./cts-api";

export interface Asset {
    assetId: number;
    vendorMachineId: string;
    assetDescription: string;
    serialNumber: string;
    assetManufacturer: string;
    assetModel: string;
    assetCost: number;
    financedAmount: number;
    equipmentCounty: string;
    dispositionDate: string;
    dateEntered: string;
    assetDetailGrouping: string;
    quantity: number;
    assetVendorId: string;
    assetVendorName: string;
    salesTaxExempt: boolean;
    propertyTaxStatusId: string;
    propertyTaxStatusDescription: string;
    listPrice: number;
    originalCost: number;
    assetCostPercentage: number;
    newUsedId: string;
    newUsedDescription: string;
    purchaseOptionId: string;
    purchaseOptionDescription: string;
    purchaseOptionDate: string;
    renewalOptionId: string;
    renewalOptionDescription: string;
    otherCost: OtherCost[];
    upfrontTax: boolean;
    upfrontTaxId: string;
    upfrontTaxDescription: string;
    upfrontTaxFinanced: boolean;
    upfrontTaxResponsibleId: string;
    upfrontTaxResponsibleDescription: string;
    upfrontTaxTaxBasisAmount: number;
    upfrontTaxStateTaxAmount: number;
    upfrontTaxCountyTaxAmount: number;
    upfrontTaxCityTaxAmount: number;
    upfrontTaxCountyTransitTaxAmount: number;
    upfrontTaxCityTransitTaxAmount: number;
    residualAmount: number;
    residualWritedownAmount: number;
    netResidualAmount: number;
    insuredResidualAmount: number;
    insuredResidualPremiumAmount: number;
    guaranteedResidualAmount: number;
    managerResidualAmount: number;
    dealerResidualAmount: number;
    presentValueResidualAmount: number;
    valueAccruedDate: string;
    locationRecords: LocationRecord[];
}
