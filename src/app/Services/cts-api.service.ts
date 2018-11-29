import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, retry, timeout } from 'rxjs/operators';
import { throwError, forkJoin } from 'rxjs';
import { ApiResponse, ApplicationUpdate } from '../Models/cts-api';
import { Contract } from '../Models/cts-api.contract';
import { Application } from '../Models/cts-api.application';
import { LoaderService } from './loader-service';
import { AssetUpdate, Asset } from '../Models/cts-api.asset';
import { DataService } from './data.service';

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

  constructor(
    private data: DataService,
    private http: HttpClient,
    private loader: LoaderService
  ) { }

  private httpGet(url: string): Observable<any> {
    return this.http.get(url, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => {
          // return throwError(new Error('testing http error'));
          return resp as ApiResponse;
        })
        , catchError(this.handleError)
      );
  }

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
    return this.httpGet(CONSTANTS.CTS_API_CONTRACT_GET_BY_CONTRACTID + contractid);
  }

  GetContractsByApplicationId(applicationid: string): Observable<ApiResponse> {
    return this.httpGet(CONSTANTS.CTS_API_CONTRACT_GET_BY_APPLICATIONID + applicationid);
  }

  GetContractsByCustomerId(customerid: string): Observable<ApiResponse> {
    return this.httpGet(CONSTANTS.CTS_API_CONTRACT_GET_BY_CUSTOMERID + customerid);
  }

  GetByAssetId(assetid: string): Observable<ApiResponse> {
    return this.httpGet(CONSTANTS.CTS_API_ASSET_GET_BY_ASSETID + assetid);
  }

  GetAssetsByContractId(contractid: string): Observable<ApiResponse> {
    return this.httpGet(CONSTANTS.CTS_API_ASSET_GET_BY_CONTRACTID + contractid);
  }

  GetAssetsByCustomerId(customerid: string): Observable<ApiResponse> {
    return this.httpGet(CONSTANTS.CTS_API_ASSET_GET_BY_CUSTOMERID + customerid);
  }

  GetApplicationByApplicationId(applicationId: string): Observable<ApiResponse> {
    return this.httpGet(CONSTANTS.CTS_API_APPLICATION_GET_BY_APPLICATIONID + applicationId);
  }

  SendContractAndAssets(): Observable<any> {
    const a = this.SendContractData();
    const b = this.SendAssetsData();
    return forkJoin([a, b]);
  }

  SendAssetsData(): Observable<ApiResponse> {
    const applicationId: number = this.data.modifiedContract.applicationId;
    const assetsList: Asset[] = this.data.workingcontractAsset;
    const assets = this.ConvertAssetsToAssetUpdates(assetsList);
    return this.PostCreateAssetForApplication(applicationId, assets);
  }

  SendContractData(): Observable<ApiResponse> {
    const applicationId: number = this.data.modifiedContract.applicationId;
    const modifiedContract: Contract = this.data.modifiedContract;
    const actualContract = this.data.actualContract;
    const putApp: any = this.ConvertContractToApplication(modifiedContract, true, actualContract);
    putApp.applicationId = applicationId;
    return this.PutUpdateApplication(putApp);
  }

  PutUpdateApplication(updateapplication: any): Observable<ApiResponse> {
    const au: ApplicationUpdate = this.converApplicationToAppUpdate(updateapplication);
    const jsonAu = JSON.stringify(au);
    console.log(jsonAu);
    return this.http.put(CONSTANTS.CTS_API_APPLICATION_PUT_APPLICATION + updateapplication.applicationId, jsonAu, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  PostCreateAssetForApplication(applicationId: number, newAsset: AssetUpdate[]): Observable<ApiResponse> {
    const a = JSON.stringify(newAsset);
    console.log(a);
    return this.http.post(CONSTANTS.CTS_API_APPLICATION_POST_ASSET.replace(/%a/g, applicationId.toString()), a, this.httpOptions)
      .pipe(
        timeout(this.toSecs),
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  ConvertAssetsToAssetUpdates(selAssets: Asset[]): AssetUpdate[] {
    const auL: AssetUpdate[] = [];
    selAssets.forEach(
      a => {
        const au: any = {
          address1: a.currentEquipmentAddress1,
          address2: a.currentEquipmentAddress2,
          city: a.currentEquipmentCity,
          state: a.currentEquipmentState,
          zip: a.currentEquipmentZip,
          assetDescription: a.assetDescription,
          assetModel: a.assetModel,
          serialNumber: a.serialNumber,
          quantity: a.quantity,
          manufacturerDesc: a.manufacturerDesc,
          vendorMachineId: a.vendorMachineId,
        };
        auL.push(au);
      }
    );
    return auL;
  }

  converApplicationToAppUpdate(ua: any): any {
    // const au: ApplicationUpdate = {
    //   collateralCode: ua.collateralCode.toString(),
    //   gracePeriodDays: ua.gracePeriodDays,
    //   indirectBilling: 0, // (ua.indirectBilling ? Number.parseInt(ua.indirectBilling) : 0),
    //   invoiceCode: ua.invoiceCode,
    //   invoiceDesc: ua.invoiceDesc,
    //   lateChargeExempt: ua.lateChargeExempt,
    //   lateChargeMax: ua.lateChargeMax,
    //   lateChargeMin: ua.lateChargeMin,
    //   lateChargePctOfPmt: ua.lateChargePctOfPmt,
    //   leadDays: ua.leadDays,
    //   lesseeAddress1: ua.lesseeAddress1,
    //   lesseeAddress2: ua.lesseeAddress2,
    //   lesseeAttnName: ua.lesseeAttnName,
    //   lesseeCity: ua.lesseeCity,
    //   lesseeEmail: ua.lesseeEmail,
    //   lesseeFax: ua.lesseeFax,
    //   lesseeName: ua.lesseeName,
    //   lesseePhone: ua.lesseePhone,
    //   masterAgreementNumber: ua.masterAgreementNumber,
    //   privateLabel: ua.privateLabel,
    //   programType: ua.programType.toString(),
    //   relationshipCode: ua.relationshipCode,
    //   renewalTerm: (ua.renewalTerm ? Number.parseInt(ua.renewalTerm) : null),
    //   signerUserNumber: ua.signerUserNumber,
    //   vendorContractId: ua.vendorContractId,
    //   docProfile: ua.docProfileId,
    //   lesseeAddress3: '',
    //   vendorCustomerId: '',
    //   personalGuarantors: ua.personalGuarantors
    // };
    // const aaa: ApplicationUpdate;
    const au: any = {};
    if (ua.hasOwnProperty('collateralCode')) { au.collateralCode = ua.collateralCode.toString(); }
    if (ua.hasOwnProperty('docProfileId')) { au.docProfileId = (ua.docProfileId ? Number.parseInt(ua.docProfileId) : 0); }
    if (ua.hasOwnProperty('gracePeriodDays')) { au.gracePeriodDays = (ua.gracePeriodDays ? Number.parseInt(ua.gracePeriodDays) : 0); }
    if (ua.hasOwnProperty('indirectBilling')) { au.indirectBilling = (ua.indirectBilling ? Number.parseInt(ua.indirectBilling) : 0); }
    if (ua.hasOwnProperty('invoiceCode')) { au.invoiceCode = ua.invoiceCode.toString(); }
    if (ua.hasOwnProperty('invoiceDesc')) { au.invoiceDesc = ua.invoiceDesc.toString(); }
    if (ua.hasOwnProperty('lateChargeExempt')) { au.lateChargeExempt = ua.lateChargeExempt; }
    if (ua.hasOwnProperty('lateChargeMax')) { au.lateChargeMax = (ua.lateChargeMax ? Number.parseInt(ua.lateChargeMax) : 0); }
    if (ua.hasOwnProperty('lateChargeMin')) { au.lateChargeMin = (ua.lateChargeMin ? Number.parseInt(ua.lateChargeMin) : 0); }
    if (ua.hasOwnProperty('lateChargePctOfPmt')) { au.lateChargePctOfPmt = (ua.lateChargePctOfPmt ? Number.parseFloat(ua.lateChargePctOfPmt) : 0); }
    if (ua.hasOwnProperty('leadDays')) { au.leadDays = (ua.leadDays ? Number.parseInt(ua.leadDays) : 0); }

    if (ua.hasOwnProperty('lesseeAddress1')) { au.lesseeAddress1 = ua.lesseeAddress1.toString(); }
    if (ua.hasOwnProperty('lesseeAddress2')) { au.lesseeAddress2 = ua.lesseeAddress2.toString(); }
    if (ua.hasOwnProperty('lesseeAttnName')) { au.lesseeAttnName = ua.lesseeAttnName.toString(); }
    if (ua.hasOwnProperty('lesseeCity')) { au.lesseeCity = ua.lesseeCity.toString(); }
    if (ua.hasOwnProperty('lesseeState')) { au.lesseeState = ua.lesseeState.toString(); }
    if (ua.hasOwnProperty('lesseeZip')) { au.lesseeZip = ua.lesseeZip.toString(); }
    if (ua.hasOwnProperty('lesseeEmail')) { au.lesseeEmail = ua.lesseeEmail.toString(); }
    if (ua.hasOwnProperty('lesseeFax')) { au.lesseeFax = ua.lesseeFax.toString(); }
    if (ua.hasOwnProperty('lesseeName')) { au.lesseeName = ua.lesseeName.toString(); }
    if (ua.hasOwnProperty('lesseePhone')) { au.lesseePhone = ua.lesseePhone.toString(); }

    if (ua.hasOwnProperty('masterAgreementNumber')) { au.masterAgreementNumber = ua.masterAgreementNumber.toString(); }
    if (ua.hasOwnProperty('privateLabel')) { au.privateLabel = ua.privateLabel; }
    if (ua.hasOwnProperty('programType')) { au.programType = ua.programType.toString(); }
    if (ua.hasOwnProperty('relationshipCode')) { au.relationshipCode = ua.relationshipCode.toString(); }
    if (ua.hasOwnProperty('renewalTerm')) { au.renewalTerm = (ua.renewalTerm ? Number.parseInt(ua.renewalTerm) : 0); }
    if (ua.hasOwnProperty('signerUserNumber')) { au.signerUserNumber = (ua.signerUserNumber ? Number.parseInt(ua.signerUserNumber) : 0); }
    if (ua.hasOwnProperty('vendorContractId')) { au.vendorContractId = ua.vendorContractId.toString(); }
    if (ua.hasOwnProperty('lesseeAddress3')) { au.lesseeAddress3 = ''; }
    if (ua.hasOwnProperty('vendorCustomerId')) { au.vendorCustomerId = ''; }
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
      'An error has occured. Please try again. If it continues to occur, please contact the Help Desk.');
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
    c.lesseeName = a.lesseeName;
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

  compareNotNullAndChange(a: any, aprop: string, c: Contract, cprop: string, compareTo: Contract): boolean {
    let i1 = c[cprop];
    let i2 = compareTo[cprop];
    if (i1 === null) { i1 = ''; }
    if (i2 === null) { i2 = ''; }
    if (i1 === i2) { return false; }
    a[aprop] = c[cprop];
    return true;
  }

  ConvertContractToApplication(c: Contract, changesOnly: boolean = false, compareTo: Contract = null) {
    const a: any = {};
    let addrChanged = false;
    this.compareNotNullAndChange(a, 'dealerId', c, 'vendorId', compareTo);
    this.compareNotNullAndChange(a, 'programType', c, 'programTypeId', compareTo);
    this.compareNotNullAndChange(a, 'relationshipCode', c, 'relationshipId', compareTo);
    this.compareNotNullAndChange(a, 'relationshipCodeDesc', c, 'relationshipDesc', compareTo);

    addrChanged = this.compareNotNullAndChange(a, 'lesseeAddress1', c, 'billToAddress1', compareTo);
    if (addrChanged) {
      a.lesseeAddress2 = c.billToAddress2;
    } else {
      addrChanged = this.compareNotNullAndChange(a, 'lesseeAddress2', c, 'billToAddress2', compareTo);
    }
    if (addrChanged) {
      a.lesseeAttnName = c.billToAttnName;
    } else {
      addrChanged = this.compareNotNullAndChange(a, 'lesseeAttnName', c, 'billToAttnName', compareTo);
    }
    if (addrChanged) {
      a.lesseeCity = c.billToCity;
    } else {
      addrChanged = this.compareNotNullAndChange(a, 'lesseeCity', c, 'billToCity', compareTo);
    }
    if (addrChanged) {
      a.lesseeCountry = c.billToCountry;
    } else {
      addrChanged = this.compareNotNullAndChange(a, 'lesseeCountry', c, 'billToCountry', compareTo);
    }
    if (addrChanged) {
      a.lesseeName = c.billToName;
    } else {
      addrChanged = this.compareNotNullAndChange(a, 'lesseeName', c, 'billToName', compareTo);
    }
    if (addrChanged) {
      a.lesseeState = c.billToState;
    } else {
      addrChanged = this.compareNotNullAndChange(a, 'lesseeState', c, 'billToState', compareTo);
    }
    if (addrChanged) {
      a.lesseeZip = c.billToZip;
    } else {
      addrChanged = this.compareNotNullAndChange(a, 'lesseeZip', c, 'billToZip', compareTo);
    }

    this.compareNotNullAndChange(a, 'signerName', c, 'requiredSigner', compareTo);
    this.compareNotNullAndChange(a, 'term', c, 'termLength', compareTo);
    this.compareNotNullAndChange(a, 'eotOption', c, 'endOfTermOption', compareTo);
    this.compareNotNullAndChange(a, 'eotOptionDesc', c, 'endOfTermOptionDesc', compareTo);
    this.compareNotNullAndChange(a, 'purchaseOption', c, 'purchaseOptionId', compareTo);
    this.compareNotNullAndChange(a, 'purchaseOptionDesc', c, 'purchaseOptionDesc', compareTo);
    this.compareNotNullAndChange(a, 'docProfileId', c, 'documentProfileId', compareTo);
    this.compareNotNullAndChange(a, 'docProfileName', c, 'documentProfileName', compareTo);
    this.compareNotNullAndChange(a, 'docProfileFooter', c, 'documentProfileFooter', compareTo);
    this.compareNotNullAndChange(a, 'totalFinanceAmount', c, 'equipmentCost', compareTo);
    this.compareNotNullAndChange(a, 'purchaseOrderInfoLeaseFlag', c, 'purchaseOrderIndicator', compareTo);
    this.compareNotNullAndChange(a, 'insuranceStatus', c, 'insuranceStatusCode', compareTo);
    this.compareNotNullAndChange(a, 'invoiceDesc', c, 'invoiceDescription', compareTo);
    this.compareNotNullAndChange(a, 'collateralCode', c, 'collateralCodeId', compareTo);
    this.compareNotNullAndChange(a, 'collateralCodeDesc', c, 'collateralCodeDesc', compareTo);
    this.compareNotNullAndChange(a, 'lateChargePctOfPmt', c, 'lateChargeRate', compareTo);
    this.compareNotNullAndChange(a, 'gracePeriodDays', c, 'gracePeriod', compareTo);
    this.compareNotNullAndChange(a, 'securitizationCode', c, 'productLineId', compareTo);
    this.compareNotNullAndChange(a, 'securitizationCodeDesc', c, 'productLineDesc', compareTo);
    this.compareNotNullAndChange(a, 'vendorContractId', c, 'vendorContractNumber', compareTo);
    this.compareNotNullAndChange(a, 'renewalTerm', c, 'renewalEligibleTerm', compareTo);
    this.compareNotNullAndChange(a, 'achCode', c, 'achCode', compareTo);
    this.compareNotNullAndChange(a, 'applicationId', c, 'applicationId', compareTo);
    this.compareNotNullAndChange(a, 'billingCycle', c, 'billingCycle', compareTo);
    // this.compareNotNullAndChange(a, 'indirectBilling', c, 'indirectBilling', compareTo);
    // this.compareNotNullAndChange(a, 'indirectBillingDesc', c, 'indirectBillingDesc', compareTo);
    this.compareNotNullAndChange(a, 'insuranceStatusDesc', c, 'insuranceStatusDesc', compareTo);
    this.compareNotNullAndChange(a, 'invoiceCode', c, 'invoiceCode', compareTo);
    this.compareNotNullAndChange(a, 'invoiceCodeDesc', c, 'invoiceCodeDesc', compareTo);
    this.compareNotNullAndChange(a, 'lateChargeExempt', c, 'lateChargeExempt', compareTo);
    this.compareNotNullAndChange(a, 'lateChargeMax', c, 'lateChargeMax', compareTo);
    this.compareNotNullAndChange(a, 'lateChargeMin', c, 'lateChargeMin', compareTo);
    this.compareNotNullAndChange(a, 'leadDays', c, 'leadDays', compareTo);
    this.compareNotNullAndChange(a, 'leaseType', c, 'leaseType', compareTo);
    this.compareNotNullAndChange(a, 'leaseTypeDesc', c, 'leaseTypeDesc', compareTo);
    this.compareNotNullAndChange(a, 'lesseeEmail', c, 'collectionContactEmail', compareTo);
    this.compareNotNullAndChange(a, 'lesseeFax', c, 'lesseeFax', compareTo);
    this.compareNotNullAndChange(a, 'lesseePhone', c, 'lesseePhone', compareTo);
    this.compareNotNullAndChange(a, 'masterAgreementNumber', c, 'masterAgreementNumber', compareTo);
    this.compareNotNullAndChange(a, 'personalGuarantors', c, 'guarantors', compareTo);
    this.compareNotNullAndChange(a, 'privateLabel', c, 'privateLabel', compareTo);
    this.compareNotNullAndChange(a, 'programTypeDesc', c, 'programTypeDesc', compareTo);
    this.compareNotNullAndChange(a, 'purchaseOrder', c, 'purchaseOrder', compareTo);
    this.compareNotNullAndChange(a, 'securExcludeReason', c, 'securExcludeReason', compareTo);
    this.compareNotNullAndChange(a, 'securExcludeReasonDesc', c, 'securExcludeReasonDesc', compareTo);
    this.compareNotNullAndChange(a, 'variablePayment', c, 'variablePayment', compareTo);
    return a;
  }


}
  // ConvertContractToApplication(a: Application, c: Contract, changesOnly: boolean = false, compareTo: Contract = null) {
  //   a.dealerId = c.vendorId;
  //   a.programType = c.programTypeId;
  //   a.relationshipCode = c.relationshipId;
  //   a.relationshipCodeDesc = c.relationshipDesc;
  //   a.lesseeAddress1 = c.billToAddress1;
  //   a.lesseeAddress2 = c.billToAddress2;
  //   a.lesseeAttnName = c.billToAttnName;
  //   a.lesseeCity = c.billToCity;
  //   a.lesseeCountry = c.billToCountry;
  //   a.lesseeName = c.billToName;
  //   a.lesseeState = c.billToState;
  //   a.lesseeZip = c.billToZip;
  //   a.signerName = c.requiredSigner;
  //   a.term = c.termLength;
  //   a.eotOption = c.endOfTermOption;
  //   a.eotOptionDesc = c.endOfTermOptionDesc;
  //   a.purchaseOption = c.purchaseOptionId;
  //   a.purchaseOptionDesc = c.purchaseOptionDesc;
  //   a.docProfileId = c.documentProfileId;
  //   a.docProfileName = c.documentProfileName;
  //   a.docProfileFooter = c.documentProfileFooter;
  //   a.totalFinanceAmount = c.equipmentCost;
  //   a.purchaseOrderInfoLeaseFlag = c.purchaseOrderIndicator;
  //   a.insuranceStatus = c.insuranceStatusCode;
  //   a.invoiceDesc = c.invoiceDescription;
  //   a.collateralCode = c.collateralCodeId;
  //   a.collateralCodeDesc = c.collateralCodeDesc;
  //   a.lateChargePctOfPmt = c.lateChargeRate;
  //   a.gracePeriodDays = c.gracePeriod;
  //   a.securitizationCode = c.productLineId;
  //   a.securitizationCodeDesc = c.productLineDesc;
  //   a.vendorContractId = c.vendorContractNumber;
  //   a.renewalTerm = c.renewalEligibleTerm;
  //   a.achCode = c.achCode;
  //   a.applicationId = c.applicationId;
  //   a.billingCycle = c.billingCycle;
  //   a.indirectBilling = c.indirectBilling;
  //   a.indirectBillingDesc = c.indirectBillingDesc;
  //   a.insuranceStatusDesc = c.insuranceStatusDesc;
  //   a.invoiceCode = c.invoiceCode;
  //   a.invoiceCodeDesc = c.invoiceCodeDesc;
  //   a.lateChargeExempt = c.lateChargeExempt;
  //   a.lateChargeMax = c.lateChargeMax;
  //   a.lateChargeMin = c.lateChargeMin;
  //   a.leadDays = c.leadDays;
  //   a.leaseType = c.leaseType;
  //   a.leaseTypeDesc = c.leaseTypeDesc;
  //   a.lesseeEmail = c.lesseeEmail;
  //   a.lesseeEmail = c.collectionContactEmail;
  //   a.lesseeFax = c.lesseeFax;
  //   a.lesseePhone = c.lesseePhone;
  //   a.masterAgreementNumber = c.masterAgreementNumber;
  //   a.personalGuarantors = c.guarantors;
  //   a.privateLabel = c.privateLabel;
  //   a.programTypeDesc = c.programTypeDesc;
  //   a.purchaseOrder = c.purchaseOrder;
  //   a.securExcludeReason = c.securExcludeReason;
  //   a.securExcludeReasonDesc = c.securExcludeReasonDesc;
  //   a.variablePayment = c.variablePayment;

  //   // a.renewalTermDesc = c.;
  //   // a.signerTitle = c.signerTitle;
  //   // a.signerUserNumber = c.signerUserNumber;
  // }

// ConvertContractToApplication(a: Application, c: Contract, changesOnly: boolean = false, compareTo: Contract = null) {
//   if (!changesOnly || (compareTo.vendorId !== c.vendorId)) { a.dealerId = c.vendorId; }
//   if (!changesOnly || (compareTo.programTypeId !== c.programTypeId)) { a.programType = c.programTypeId; }
//   if (!changesOnly || (compareTo.relationshipId !== c.relationshipId)) {a.relationshipCode = c.relationshipId;}
//   if (!changesOnly || (compareTo.relationshipDesc !== c.relationshipDesc)) {a.relationshipCodeDesc = c.relationshipDesc;}
//   if (!changesOnly || (compareTo.billToAddress1 !== c.billToAddress1)) {a.lesseeAddress1 = c.billToAddress1;}
//   if (!changesOnly || (compareTo.billToAddress2 !== c.billToAddress2)) {a.lesseeAddress2 = c.billToAddress2;}
//   if (!changesOnly || (compareTo.billToAttnName !== c.billToAttnName)) {a.lesseeAttnName = c.billToAttnName;}
//   if (!changesOnly || (compareTo.billToCity !== c.billToCity)) {a.lesseeCity = c.billToCity;}
//   if (!changesOnly || (compareTo.billToCountry !== c.billToCountry)) {a.lesseeCountry = c.billToCountry;}
//   if (!changesOnly || (compareTo.billToName !== c.billToName)) {a.lesseeName = c.billToName;}
//   if (!changesOnly || (compareTo.billToState !== c.billToState)) {a.lesseeState = c.billToState;}
//   if (!changesOnly || (compareTo.billToZip !== c.billToZip)) {a.lesseeZip = c.billToZip;}
//   if (!changesOnly || (compareTo.requiredSigner !== c.requiredSigner)) {a.signerName = c.requiredSigner;}
//   if (!changesOnly || (compareTo.termLength !== c.termLength)) {a.term = c.termLength;}
//   if (!changesOnly || (compareTo.endOfTermOption !== c.endOfTermOption)) {a.eotOption = c.endOfTermOption;}
//   if (!changesOnly || (compareTo.endOfTermOptionDesc !== c.endOfTermOptionDesc)) {a.eotOptionDesc = c.endOfTermOptionDesc;}
//   if (!changesOnly || (compareTo.purchaseOptionId !== c.purchaseOptionId)) {a.purchaseOption = c.purchaseOptionId;}
//   if (!changesOnly || (compareTo.purchaseOptionDesc !== c.purchaseOptionDesc)) {a.purchaseOptionDesc = c.purchaseOptionDesc;}
//   if (!changesOnly || (compareTo.documentProfileId !== c.documentProfileId)) {a.docProfileId = c.documentProfileId;}
//   if (!changesOnly || (compareTo.documentProfileName !== c.documentProfileName)) {a.docProfileName = c.documentProfileName;}
//   if (!changesOnly || (compareTo.documentProfileFooter !== c.documentProfileFooter)) {a.docProfileFooter = c.documentProfileFooter;}
//   if (!changesOnly || (compareTo.equipmentCost !== c.equipmentCost)) {a.totalFinanceAmount = c.equipmentCost;}
//   if (!changesOnly || (compareTo.purchaseOrderIndicator !== c.purchaseOrderIndicator)) {a.purchaseOrderInfoLeaseFlag = c.purchaseOrderIndicator;}
//   if (!changesOnly || (compareTo.insuranceStatusCode !== c.insuranceStatusCode)) {a.insuranceStatus = c.insuranceStatusCode;}
//   if (!changesOnly || (compareTo.invoiceDescription !== c.invoiceDescription)) {a.invoiceDesc = c.invoiceDescription;}
//   if (!changesOnly || (compareTo.collateralCodeId !== c.collateralCodeId)) {a.collateralCode = c.collateralCodeId;}
//   if (!changesOnly || (compareTo.collateralCodeDesc !== c.collateralCodeDesc)) {a.collateralCodeDesc = c.collateralCodeDesc;}
//   if (!changesOnly || (compareTo.lateChargeRate !== c.lateChargeRate)) {a.lateChargePctOfPmt = c.lateChargeRate;}
//   if (!changesOnly || (compareTo.gracePeriod !== c.gracePeriod)) {a.gracePeriodDays = c.gracePeriod;}
//   if (!changesOnly || (compareTo.productLineId !== c.productLineId)) {a.securitizationCode = c.productLineId;}
//   if (!changesOnly || (compareTo.productLineDesc !== c.productLineDesc)) {a.securitizationCodeDesc = c.productLineDesc;}
//   if (!changesOnly || (compareTo.vendorContractNumber !== c.vendorContractNumber)) {a.vendorContractId = c.vendorContractNumber;}
//   if (!changesOnly || (compareTo.renewalEligibleTerm !== c.renewalEligibleTerm)) {a.renewalTerm = c.renewalEligibleTerm;}
//   if (!changesOnly || (compareTo.achCode !== c.achCode)) {a.achCode = c.achCode;}
//   if (!changesOnly || (compareTo.applicationId !== c.applicationId)) {a.applicationId = c.applicationId;}
//   if (!changesOnly || (compareTo.billingCycle !== c.billingCycle)) {a.billingCycle = c.billingCycle;}
//   if (!changesOnly || (compareTo.indirectBilling !== c.indirectBilling)) {a.indirectBilling = c.indirectBilling;}
//   if (!changesOnly || (compareTo.indirectBillingDesc !== c.indirectBillingDesc)) {a.indirectBillingDesc = c.indirectBillingDesc;}
//   if (!changesOnly || (compareTo.insuranceStatusDesc !== c.insuranceStatusDesc)) {a.insuranceStatusDesc = c.insuranceStatusDesc;}
//   if (!changesOnly || (compareTo.invoiceCode !== c.invoiceCode)) {a.invoiceCode = c.invoiceCode;}
//   if (!changesOnly || (compareTo.invoiceCodeDesc !== c.invoiceCodeDesc)) {a.invoiceCodeDesc = c.invoiceCodeDesc;}
//   if (!changesOnly || (compareTo.lateChargeExempt !== c.lateChargeExempt)) {a.lateChargeExempt = c.lateChargeExempt;}
//   if (!changesOnly || (compareTo.lateChargeMax !== c.lateChargeMax)) {a.lateChargeMax = c.lateChargeMax;}
//   if (!changesOnly || (compareTo.lateChargeMin !== c.lateChargeMin)) {a.lateChargeMin = c.lateChargeMin;}
//   if (!changesOnly || (compareTo.leadDays !== c.leadDays)) {a.leadDays = c.leadDays;}
//   if (!changesOnly || (compareTo.leaseType !== c.leaseType)) {a.leaseType = c.leaseType;}
//   if (!changesOnly || (compareTo.leaseTypeDesc !== c.leaseTypeDesc)) {a.leaseTypeDesc = c.leaseTypeDesc;}
//   if (!changesOnly || (compareTo.collectionContactEmail !== c.collectionContactEmail)) {a.lesseeEmail = c.collectionContactEmail;}
//   if (!changesOnly || (compareTo.lesseeFax !== c.lesseeFax)) {a.lesseeFax = c.lesseeFax;}
//   if (!changesOnly || (compareTo.lesseePhone !== c.lesseePhone)) {a.lesseePhone = c.lesseePhone;}
//   if (!changesOnly || (compareTo.masterAgreementNumber !== c.masterAgreementNumber)) {a.masterAgreementNumber = c.masterAgreementNumber;}
//   if (!changesOnly || (compareTo.guarantors !== c.guarantors)) {a.personalGuarantors = c.guarantors;}
//   if (!changesOnly || (compareTo.privateLabel !== c.privateLabel)) {a.privateLabel = c.privateLabel;}
//   if (!changesOnly || (compareTo.programTypeDesc !== c.programTypeDesc)) {a.programTypeDesc = c.programTypeDesc;}
//   if (!changesOnly || (compareTo.purchaseOrder !== c.purchaseOrder)) {a.purchaseOrder = c.purchaseOrder;}
//   if (!changesOnly || (compareTo.securExcludeReason !== c.securExcludeReason)) {a.securExcludeReason = c.securExcludeReason;}
//   if (!changesOnly || (compareTo.securExcludeReasonDesc !== c.)) {a.securExcludeReasonDesc = c.securExcludeReasonDesc;}
//   if (!changesOnly || (compareTo. !== c.)) {a.variablePayment = c.variablePayment;}

//   // a.renewalTermDesc = c.;
//   // a.signerTitle = c.signerTitle;
//   // a.signerUserNumber = c.signerUserNumber;
// }