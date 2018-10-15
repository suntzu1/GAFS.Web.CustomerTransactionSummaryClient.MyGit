import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiResponse, ApplicationUpdate } from '../Models/cts-api';

@Injectable({
  providedIn: 'root'
})
export class CtsApiService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'system': 'vision',
      'dealerids': '[]',
      'incldisposed': 'false',
      'Authorization': 'some12345kind3456of567security543token3456will7890be432added-0982here35465to34323secure`123=-09the@#$%^api'
    })
  };
  headerItems = {
  };

  constructor(private http: HttpClient) { }

  GetByCustomerId(customerid: string, dealerids: any[], incldisposed: boolean): Observable<ApiResponse> {
    const ds = dealerids != null && dealerids.length > 0 ? dealerids.map(i => i.item_id.toString()) : [];
    return this.http.get(CONSTANTS.CTS_API_GET_BY_CUSTOMER + customerid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'system': 'vision',
        'dealerids': ds,
        'incldisposed': incldisposed == null ? 'false' : incldisposed.toString(),
        'Authorization': 'some12345kind3456of567security543token3456will7890be432added-0982here35465to34323secure`123=-09the@#$%^api'
      })
    })
      .pipe(
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetByContractId(contractid: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_GET_BY_CONTRACT + contractid, this.httpOptions)
      .pipe(
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetByApplicationId(applicationId: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_GET_BY_APPLICATION + applicationId, this.httpOptions)
      .pipe(
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  GetByAssetId(assetid: string): Observable<ApiResponse> {
    return this.http.get(CONSTANTS.CTS_API_GET_BY_ASSET + assetid, this.httpOptions)
      .pipe(
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
  }

  PutUpdateApplication(updateapplication: ApplicationUpdate): Observable<ApiResponse> {
    return this.http.put(CONSTANTS.CTS_API_PUT_APPLICATION, updateapplication, this.httpOptions)
      .pipe(
        map(resp => resp as ApiResponse)
        , catchError(this.handleError)
      );
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
}
