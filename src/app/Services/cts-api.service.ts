import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiResponse, ApplicationUpdate } from '../Models/cts-api';
import { Contract } from '../Models/cts-api.contract';
import { Application } from '../Models/cts-api.application';
import { UsageComponent } from '../Components/usage/usage.component';

@Injectable({
  providedIn: 'root'
})
export class CtsApiService {
  private toSecs = 60000;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'system': 'GFSC',
      // 'dealerids': '[]',
      'incldisposed': 'false',
      'Authorization': 'Basic c3ZjTXVsZXNvZnQ6bWFkTWF4MjIk',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      // 'Authorization': 'some12345kind3456of567security543token3456will7890be432added-0982here35465to34323secure`123=-09the@#$%^api'
    })
  };
  headerItems = {
  };

  constructor(private http: HttpClient) { }

  GetByCustomerId(customerid: string, dealerids: any[], incldisposed: boolean): Observable<ApiResponse> {
    const ds = dealerids != null && dealerids.length > 0 ? dealerids.map(i => i.item_id.toString()) : [];
    return this.http.get(CONSTANTS.CTS_API_CONTRACT_GET_BY_CUSTOMERID + customerid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'system': 'vision',
        'Authorization': 'Basic c3ZjTXVsZXNvZnQ6bWFkTWF4MjIk',
        'dealerids': ds,
        'incldisposed': incldisposed == null ? 'false' : incldisposed.toString(),
        // 'Authorization': 'some12345kind3456of567security543token3456will7890be432added-0982here35465to34323secure`123=-09the@#$%^api'
      })
    })
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetByContractId(contractid: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_CONTRACT_GET_BY_CONTRACTID + contractid, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetContractsByApplicationId(applicationid: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_CONTRACT_GET_BY_APPLICATIONID + applicationid, this.httpOptions)
      .pipe(
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetContractsByCustomerId(customerid: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_CONTRACT_GET_BY_CUSTOMERID + customerid, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetByAssetId(assetid: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_ASSET_GET_BY_ASSETID + assetid, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetAssetsByContractId(contractid: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_ASSET_GET_BY_CONTRACTID + contractid, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetAssetsByCustomerId(customerid: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_ASSET_GET_BY_CUSTOMERID + customerid, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetApplicationByApplicationId(applicationId: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_APPLICATION_GET_BY_APPLICATIONID + applicationId, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  PutUpdateApplication(updateapplication: Application): Observable<ApiResponse> {
    debugger;
    const au: ApplicationUpdate = this.converApplicationToAppUpdate(updateapplication);
    const jsonAu = JSON.stringify(au);
    return this.http.put(CONSTANTS.CTS_API_APPLICATION_PUT_APPLICATION + updateapplication.applicationId, jsonAu, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  converApplicationToAppUpdate(ua: Application): any {
    const au: ApplicationUpdate = {
      collateralCode: ua.collateralCode.toString(),
      gracePeriodDays: ua.gracePeriodDays,
      indirectBilling: 0, // (ua.indirectBilling ? Number.parseInt(ua.indirectBilling) : 0),
      invoiceCode: ua.invoiceCode,
      invoiceDesc: ua.invoiceDesc,
      lateChargeExempt: ua.lateChargeExempt,
      lateChargeMax: ua.lateChargeMax,
      lateChargeMin: ua.lateChargeMin,
      lateChargePctOfPmt: ua.lateChargePctOfPmt,
      leadDays: ua.leadDays,
      lesseeAddress1: ua.lesseeAddress1,
      lesseeAddress2: ua.lesseeAddress2,
      lesseeAttnName: ua.lesseeAttnName,
      lesseeCity: ua.lesseeCity,
      lesseeEmail: ua.lesseeEmail,
      lesseeFax: ua.lesseeFax,
      lesseeName: ua.lesseeName,
      lesseePhone: ua.lesseePhone,
      masterAgreementNumber: ua.masterAgreementNumber,
      privateLabel: ua.privateLabel,
      programType: ua.programType.toString(),
      relationshipCode: ua.relationshipCode,
      renewalTerm: (ua.renewalTerm ? Number.parseInt(ua.renewalTerm) : null),
      signerUserNumber: ua.signerUserNumber,
      vendorContractId: ua.vendorContractId,
      docProfile: ua.docProfileId,
      lesseeAddress3: '',
      vendorCustomerId: '',
      personalGuarantors: ua.personalGuarantors
    };
    // au.collateralCode = ua.collateralCode;
    // au.gracePeriodDays = ua.gracePeriodDays;
    // au.indirectBilling = (ua.indirectBilling ? Number.parseInt(ua.indirectBilling) : null);
    // au.invoiceCode = ua.invoiceCode;
    // au.invoiceDesc = ua.invoiceDesc;
    // au.lateChargeExempt = ua.lateChargeExempt;
    // au.lateChargeMax = ua.lateChargeMax;
    // au.lateChargeMin = ua.lateChargeMin;
    // au.lateChargePctOfPmt = ua.lateChargePctOfPmt;
    // au.leadDays = ua.leadDays;
    // au.lesseeAddress1 = ua.lesseeAddress1;
    // au.lesseeAddress2 = ua.lesseeAddress2;
    // au.lesseeAttnName = ua.lesseeAttnName;
    // au.lesseeCity = ua.lesseeCity;
    // au.lesseeEmail = ua.lesseeEmail;
    // au.lesseeFax = ua.lesseeFax;
    // au.lesseeName = ua.lesseeName;
    // au.lesseePhone = ua.lesseePhone;
    // au.masterAgreementNumber = ua.masterAgreementNumber;
    // au.privateLabel = ua.privateLabel;
    // au.programType = ua.programType;
    // au.relationshipCode = ua.relationshipCode;
    // au.renewalTerm = ua.renewalTerm;
    // au.signerUserNumber = ua.signerUserNumber;
    // au.vendorContractId = ua.vendorContractId;
    // au.docProfile = ua.docProfileId;
    // au.lesseeAddress3 = '';
    // au.vendorCustomerId = '';
    return au;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'An error has occured; please try again later. If it continues to occur, please contact application support.');
  }

  ConvertApplicationToContract(c: Contract, a: Application) {
    c.vendorId = a.dealerId;
    c.programTypeId = a.programType;
    c.relationshipId = a.relationshipCode;
    c.relationshipDesc = a.relationshipCodeDesc;
    c.billToAddress1 = a.lesseeAddress1;
    c.billToAddress2 = a.lesseeAddress2;
    c.billToAttnName = a.lesseeAttnName;
    c.billToCity = a.lesseeCity;
    c.billToCountry = a.lesseeCountry;
    c.billToName = a.lesseeName;
    c.billToState = a.lesseeState;
    c.billToZip = a.lesseeZip;
    c.requiredSigner = a.signerName;
    c.termLength = a.term;
    c.endOfTermOption = a.eotOption;
    c.endOfTermOptionDesc = a.eotOptionDesc;
    c.purchaseOptionId = a.purchaseOption;
    c.purchaseOptionDesc = a.purchaseOptionDesc;
    c.documentProfileId = a.docProfileId;
    c.documentProfileName = a.docProfileName;
    c.documentProfileFooter = a.docProfileFooter;
    c.equipmentCost = a.totalFinanceAmount;
    c.purchaseOrderIndicator = a.purchaseOrderInfoLeaseFlag;
    c.insuranceStatusCode = a.insuranceStatus;
    c.invoiceDescription = a.invoiceDesc;
    c.collateralCodeId = a.collateralCode;
    c.collateralCodeDesc = a.collateralCodeDesc;
    c.lateChargeRate = a.lateChargePctOfPmt;
    c.gracePeriod = a.gracePeriodDays;
    c.productLineId = a.securitizationCode;
    c.productLineDesc = a.securitizationCodeDesc;
    c.vendorContractNumber = a.vendorContractId;
    c.renewalEligibleTerm = a.renewalTerm ? a.renewalTerm.toString() : '';
    c.achCode = a.achCode.toString();
    c.applicationId = a.applicationId;
    c.billingCycle = a.billingCycle;
    c.indirectBilling = a.indirectBilling.toString();
    c.indirectBillingDesc = a.indirectBillingDesc;
    c.insuranceStatusDesc = a.insuranceStatusDesc;
    c.invoiceCode = a.invoiceCode;
    c.invoiceCodeDesc = a.invoiceCodeDesc;
    c.lateChargeExempt = a.lateChargeExempt;
    c.lateChargeMax = a.lateChargeMax;
    c.lateChargeMin = a.lateChargeMin;
    c.leadDays = a.leadDays;
    c.leaseType = a.leaseType;
    c.leaseTypeDesc = a.leaseTypeDesc;
    c.lesseeEmail = a.lesseeEmail;
    c.collectionContactEmail = a.lesseeEmail;
    c.lesseeFax = a.lesseeFax;
    c.lesseePhone = a.lesseePhone;
    c.masterAgreementNumber = a.masterAgreementNumber;
    c.guarantors = a.personalGuarantors;
    c.privateLabel = a.privateLabel;
    c.programTypeDesc = a.programTypeDesc;
    c.purchaseOrder = a.purchaseOrder;
    c.securExcludeReason = a.securExcludeReason;
    c.securExcludeReasonDesc = a.securExcludeReasonDesc;
    c.variablePayment = a.variablePayment;

    // c.renewalTermDesc = a.;
    // c.signerTitle = a.signerTitle;
    // c.signerUserNumber = a.signerUserNumber;
  }

  ConvertContractToApplication(a: Application, c: Contract) {
    a.dealerId = c.vendorId;
    a.programType = c.programTypeId;
    a.relationshipCode = c.relationshipId;
    a.relationshipCodeDesc = c.relationshipDesc;
    a.lesseeAddress1 = c.billToAddress1;
    a.lesseeAddress2 = c.billToAddress2;
    a.lesseeAttnName = c.billToAttnName;
    a.lesseeCity = c.billToCity;
    a.lesseeCountry = c.billToCountry;
    a.lesseeName = c.billToName;
    a.lesseeState = c.billToState;
    a.lesseeZip = c.billToZip;
    a.signerName = c.requiredSigner;
    a.term = c.termLength;
    a.eotOption = c.endOfTermOption;
    a.eotOptionDesc = c.endOfTermOptionDesc;
    a.purchaseOption = c.purchaseOptionId;
    a.purchaseOptionDesc = c.purchaseOptionDesc;
    a.docProfileId = c.documentProfileId;
    a.docProfileName = c.documentProfileName;
    a.docProfileFooter = c.documentProfileFooter;
    a.totalFinanceAmount = c.equipmentCost;
    a.purchaseOrderInfoLeaseFlag = c.purchaseOrderIndicator;
    a.insuranceStatus = c.insuranceStatusCode;
    a.invoiceDesc = c.invoiceDescription;
    a.collateralCode = c.collateralCodeId;
    a.collateralCodeDesc = c.collateralCodeDesc;
    a.lateChargePctOfPmt = c.lateChargeRate;
    a.gracePeriodDays = c.gracePeriod;
    a.securitizationCode = c.productLineId;
    a.securitizationCodeDesc = c.productLineDesc;
    a.vendorContractId = c.vendorContractNumber;
    a.renewalTerm = c.renewalEligibleTerm;
    a.achCode = c.achCode;
    a.applicationId = c.applicationId;
    a.billingCycle = c.billingCycle;
    a.indirectBilling = c.indirectBilling;
    a.indirectBillingDesc = c.indirectBillingDesc;
    a.insuranceStatusDesc = c.insuranceStatusDesc;
    a.invoiceCode = c.invoiceCode;
    a.invoiceCodeDesc = c.invoiceCodeDesc;
    a.lateChargeExempt = c.lateChargeExempt;
    a.lateChargeMax = c.lateChargeMax;
    a.lateChargeMin = c.lateChargeMin;
    a.leadDays = c.leadDays;
    a.leaseType = c.leaseType;
    a.leaseTypeDesc = c.leaseTypeDesc;
    a.lesseeEmail = c.lesseeEmail;
    a.lesseeEmail = c.collectionContactEmail;
    a.lesseeFax = c.lesseeFax;
    a.lesseePhone = c.lesseePhone;
    a.masterAgreementNumber = c.masterAgreementNumber;
    a.personalGuarantors = c.guarantors;
    a.privateLabel = c.privateLabel;
    a.programTypeDesc = c.programTypeDesc;
    a.purchaseOrder = c.purchaseOrder;
    a.securExcludeReason = c.securExcludeReason;
    a.securExcludeReasonDesc = c.securExcludeReasonDesc;
    a.variablePayment = c.variablePayment;

    // a.renewalTermDesc = c.;
    // a.signerTitle = c.signerTitle;
    // a.signerUserNumber = c.signerUserNumber;
  }

}
