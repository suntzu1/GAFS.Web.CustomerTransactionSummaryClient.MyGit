import { Guarantor, InsuranceRecord, Payment, Renewal } from './cts-api';

export interface Contract {
    a1Term: number;
    achCode: string;
    activeAssetCost: number;
    activeContract: boolean;
    activeInsurancePolicyNum: string;
    activeRenewalCBR: number;
    addOn: string;
    allowQuote: boolean;
    amortizedResidual: number;
    applicationId: number;
    approver1Id: number;
    approver1Name: string;
    approver2ID: number;
    approver2Name: string;
    assetDetail: boolean;
    assetLevelBilling: boolean;
    auditedBy: string;
    baseContractId: string;
    billingCycle: string;
    billingFrequency: string;
    billOfSaleDate: string;
    billOfSaleNotes: string;
    billToAddress1: string;
    billToAddress2: string;
    billToAddress3: string;
    billToAttnName: string;
    billToCity: string;
    billToCountry: string;
    billToName: string;
    billToState: string;
    billToZip: string;
    bookedBy: string;
    bookingAudit: string;
    bookingDate: string;
    bookNoFund: string;
    broker: string;
    brokerPointsActive: number;
    brokerPointsTotal: number;
    businessSegmentDesc: string;
    businessUnit: string;
    buyoutCBR: number;
    buyoutInstructions: string;
    buyoutMessage: string;
    buyoutUnappliedSuspense: number;
    cityTaxAmt: number;
    cityTransitTaxAmt: number;
    collateralCodeId: string;
    collateralCodeDesc: string;
    collectExempt: string;
    collectionContactEmail: string;
    collectionContactName: string;
    collectionContactPhone: string;
    collectionExemptionDate: string;
    collectorId: number;
    collectorLock: boolean;
    collectorName: string;
    commencementDate: string;
    concentrations: string;
    consolidatedContracts: string;
    consolidatedInvoicing: boolean;
    consolidationNumber: number;
    contractBalance: number;
    contractBalanceRemaining: number;
    contractComment: string;
    contractId: string;
    contractStatusDate: string;
    contractStatusDesc: string;
    contractStatusEOTDesc: string;
    contractStatusId: number;
    contractToDateFinance: number;
    contractToDateInitialDirectCosts: number;
    contractToDateInterest: number;
    contractToDateInterestReceived: number;
    contractToDateResidual: number;
    contractualDelin: boolean;
    contractualDelin1: number;
    contractualDelin31: number;
    contractualDelin61: number;
    contractualDelin91: number;
    contractualDelin121: number;
    contractualDelin151: number;
    contractualDelin181: number;
    countyTaxAmt: number;
    countyTransitTaxAmt: number;
    creditCardDate: string;
    creditRep1Id: number;
    creditRep1Name: string;
    creditRep2Id: number;
    creditRep2Name: string;
    currentOnly: boolean;
    currentRentDue: number;
    dateIntoSystem: string;
    daysDeferred: number;
    dealerMoneyCodes: string;
    delinquencyStatusCode: string;
    delinquencyStatusPreviousMonth: string;
    discountResidual: number;
    displayPeriodCovered: boolean;
    displayUsagePercentage: boolean;
    dispoAmount: number;
    disposedInterestAccrued: number;
    dispositionDate: string;
    dispoSuspense: number;
    documentationRepName: string;
    documentProfileFooter: string;
    documentProfileId: number;
    documentProfileName: string;
    downPaymentAmount: number;
    emailedInvoicing: string;
    emailedInvoicingDesc: string;
    emailedInvoicingDestination: string;
    endingDeposit: number;
    endingDepositCityTax: number;
    endingDepositCityTransitTax: number;
    endingDepositCountyTax: number;
    endingDepositCountyTransitTax: number;
    endingDepositDateApplied: string;
    endingDepositDateReceived: string;
    endingDepositStateTax: number;
    endingPaymentsAdvance: number;
    endOfTermOption: string;
    endOfTermOptionDesc: string;
    enteredRenewalCBR: number;
    enteredRenewalTermDate: string;
    equipmentCost: number;
    finalPaymentAmount: number;
    finalPaymentDate: string;
    financedFees: number;
    financedTax: number;
    financedTaxActive: number;
    financedTaxTotal: number;
    firstPaymentAmount: number;
    firstPaymentDate: string;
    firstPaymentDefault: boolean;
    fixtureOnly: string;
    floatTypeCode: string;
    fmvEquipmentCost: number;
    followUpCode: string;
    followUpDate: string;
    followUpMessage: string;
    formerRep: boolean;
    gafi: boolean;
    gafiAmount: number;
    galcVendorId: string;
    gracePeriod: number;
    grossContract: number;
    grossFinance: number;
    guaranteedResidual: number;
    guaranteedResidualDesc: string;
    guarantor: boolean;
    guarantorReq: boolean;
    guarantors: Guarantor[];
    incomeMethodId: string;
    incomeMethodDesc: string;
    incomeStartDate: string;
    indirectBilling: string;
    indirectBillingDesc: string;
    initialDirectCosts: number;
    installerNumber: string;
    insuranceRecords: InsuranceRecord[];
    insuranceCarrierNumber: string;
    insuranceCode: string;
    insuranceCodeDesc: string;
    insuranceStatusCode: string;
    insuranceStatusDesc: string;
    interestAccrued: number;
    interestRate: number;
    invoiceCode: string;
    invoiceCodeDesc: string;
    invoiceCPCCode: string;
    invoiceDescription: string;
    invoiceDueDate: string;
    invoiceDueDay: number;
    invoiceExceptionBin: string;
    invoiceFormat: string;
    invoiceFormatDesc: string;
    invoiceName: string;
    lastDateWorked: Date;
    lastPaymentDate: string;
    lateChargeAmountDue: number;
    lateChargeBeginDate: string;
    lateChargeCode: string;
    lateChargeCodeDesc: string;
    lateChargeDueWithTax: number;
    lateChargeExempt: boolean;
    lateChargeInRate: number;
    lateChargeMax: number;
    lateChargeMin: number;
    lateChargeRate: number;
    leadDays: number;
    leaseType: string;
    leaseTypeDesc: string;
    legalStatusCode: number;
    legalStatusDesc: string;
    lesseeAddress1: string;
    lesseeAddress2: string;
    lesseeAddress3: string;
    lesseeCity: string;
    lesseeCounty: string;
    lesseeCountry: string;
    lesseeEmail: string;
    lesseeFax: string;
    lesseeName: string;
    lesseePhone: string;
    lesseeShortName: string;
    lesseeState: string;
    lesseeZip: string;
    lessor: number;
    linkCode: string;
    loanAmount: number;
    managersResidual: number;
    manufacturerDiscountActive: number;
    manufacturerDiscountTotal: number;
    manufacturerDiscountAmount: number;
    manufacturerPointsAmount: number;
    manufacturerPointsActive: number;
    manufacturerPointsTotal: number;
    masterAgreementNumber: string;
    monthToDateFinance: number;
    monthToDateInitialDirectCosts: number;
    monthToDateInterest: number;
    monthToDateResidual: number;
    municipalLease: boolean;
    netInitialDirectCosts: number;
    netInvestment: number;
    nextAgingDate: string;
    nextDailyLateCharge: string;
    nextDueDate: string;
    nextFinance: number;
    nextInitialDirectCosts: number;
    nextInvoiceDate: string;
    nextLateChargeDate: string;
    nextResidual: number;
    nonAccrual90: number;
    numOfAssets: number;
    numOfAssetsDisposed: number;
    numOfAssetsNonFinanced: number;
    originalCollateralCode: string;
    originalCostActive: number;
    originalCostTotal: number;
    originalProgram: string;
    originalRenewalFirstPaymentDate: string;
    paidToDate: string;
    partialDisposition: boolean;
    pastDueAmount1: number;
    pastDueAmount31: number;
    pastDueAmount61: number;
    pastDueAmount91: number;
    pastDueCBR: number;
    pastDueTaxAmountDue: number;
    paymentAddressLetter: number;
    payments: Payment[];
    paymentPlan: string;
    paymentsAdvancedAmount: number;
    paymentsArrears: boolean;
    paymentsInArrears: boolean;
    paymentsInvoiced: number;
    paymentsMade: number;
    paymentsUpfront: number;
    poOnly: boolean;
    paymentXOfYInvoicing: boolean;
    portfolioPurchase: string;
    prefundCode: string;
    prefundCodeDesc: string;
    presentValueAmount: number;
    presentValuePercent: number;
    preTaxYield: number;
    previousYearInterestReceived: number;
    principalBalance: number;
    privateLabel: boolean;
    productLineDesc: string;
    productLineId: string;
    profitOnResidual: number;
    programTypeDesc: string;
    programTypeId: string;
    programVariation: string;
    programVariationDesc: string;
    programVariationId: string;
    promotionId: string;
    provForLoss: number;
    psgBillingTier: string;
    psgCustomerId: string;
    psgTaxCode: string;
    purchaseOptionDesc: string;
    purchaseOptionId: string;
    purchaseOrder: string;
    purchaseOrderIndicator: string;
    purchaseOrderNum: string;
    purchaseOriginalEquipmentCost: number;
    purchaseReferenceNum: string;
    quoteBuyout: string;
    referenceNumber: string;
    relationshipId: string;
    relationshipDesc: string;
    remainingPayments: number;
    remainingTerm: number;
    remitToCode: string;
    remitToDesc: string;
    renewalContractBalance: number;
    renewalContractualDelin: boolean;
    renewalContractualDelin1: number;
    renewalContractualDelin31: number;
    renewalContractualDelin61: number;
    renewalContractualDelin91: number;
    renewalContractualDelin121: number;
    renewalContractualDelin151: number;
    renewalContractualDelin181: number;
    renewalCurrentStatusDesc: string;
    renewalCurrentStatusId: string;
    renewalCurrentTermLength: number;
    renewalEligibleDesc: string;
    renewalEligibleId: string;
    renewalEligibleTerm: string;
    renewalMessageOff: boolean;
    renewalPaymentsReceived: number;
    renewalPaymentsReceivedDisposed: number;
    renewals: Renewal[];
    rentalPayment: number;
    requiredSigner: string;
    residual: number;
    residualEligiblePrice: number;
    residualIncomeMethodDesc: string;
    residualIncomeMethodId: string;
    residualWritedown: number;
    riskRating: string;
    salesRep1Id: number;
    salesRep1Name: string;
    salesRep2Id: number;
    salesRep2Name: string;
    salesRep3Id: number;
    salesRep3Name: string;
    securExcludeReason: string;
    securExcludeReasonDesc: string;
    securitizationCode: string;
    securitizationCodeDesc: string;
    securityDeposit: number;
    setupIncome: number;
    source: string;
    specialInvoicingOptions: boolean;
    spreadsheetInvoicing: boolean;
    standardIndustrialClassificationCode: string;
    startDateTerm: string;
    stateTaxAmount: number;
    termDate: string;
    termLength: number;
    timesDelinquent: number;
    timesDelinquent31: number;
    timesDelinquent61: number;
    timesDelinquent91: number;
    titleStatus: string;
    totalAssetCost: number;
    totalCustomerPayment: number;
    totalDue: number;
    totalFinanceAmount: number;
    totalInterestAmountDue: number;
    totalMiscellaneousAmountDue: number;
    totalPastDue: number;
    totalTaxAmountDue: number;
    totalVolumeReported: number;
    trueCurrentOnly: boolean;
    uccCollateralDesc: string;
    uccCollateralReference: string;
    uccSendStatus: string;
    unamortizedResidual: number;
    unappliedSuspense: number;
    unappliedSuspenseResearch: number;
    unearnedResidual: number;
    unpaidInterest: number;
    upgradeAmount: number;
    upgraded: boolean;
    upgradeFlag: number;
    upgradeResidualPercent: number;
    usageAudit: string;
    useTaxResponsibility: string;
    variablePayment: boolean;
    vbsComments: string;
    vendorCustomerNumber: string;
    vendorCustomerNumber2: string;
    vendorDiscountActive: number;
    vendorDiscountTotal: number;
    vendorDiscountAmount: number;
    vendorExternalRep: string;
    vendorId: string;
    vendorInvoiceNumber: string;
    vendorName: string;
    vendorPercentage: string;
    vendorPointsAmount: number;
    vendorPointsActive: number;
    vendorPointsTotal: number;
    vendorRenewalShareDollarOutApproved: boolean;
    vendorRenewalShareFMVApproved: boolean;
    vendorRenewalShareFrequency: string;
    vendorRenewalShareFMVPercent: number;
    vendorRenewalShareFMVProgram: string;
    vendorRenewalShareFMVPayments: number;
    vendorRenewalShareDollarOutFee: number;
    vendorRenewalShareNonStandard: boolean;
    writeOffReasonDesc: string;
    yearsInBusiness: number;
    yearToDateInterest: number;
    yearToDateInterestReceived: number;
    yield: number;
    overageContractId: string;
    vendorContractNumber: string;
    renewalTermLength: number;
}
