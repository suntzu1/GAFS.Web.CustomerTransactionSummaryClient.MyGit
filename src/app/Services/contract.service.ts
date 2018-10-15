import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Contract } from '../Models/cts-api.contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  // GetAllContracts(applicationId: string, ccanId: string): Observable<Contract[]> {
  //   return this.http
  //     .get(CONSTANTS.API_CONTRACTS_GET)
  //     .pipe(map(resp =>
  //       resp as Contract[] || []
  //       ));
  // }
}
