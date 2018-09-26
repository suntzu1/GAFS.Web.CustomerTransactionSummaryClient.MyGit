import { Injectable } from '@angular/core';
import { Contract } from '../Models/contract';
import { Http } from '@angular/http';
import { TempData } from './data';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw'

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private tempd = new TempData();

  constructor(private http: Http) { }

  GetAllContracts(applicationId: string, ccanId: string): Observable<Contract[]> {
    return this.http
      .get(CONSTANTS.API_CONTRACTS_GET)
      .pipe(map(resp => resp.json().contract));
  }
}
