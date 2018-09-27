import { Injectable } from '@angular/core';
import { Contract } from '../Models/contract';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  GetAllContracts(applicationId: string, ccanId: string): Observable<Contract[]> {
    return this.http
      .get(CONSTANTS.API_CONTRACTS_GET)
      .pipe(map(resp =>
        resp as Contract[] || []
        ));
  }
}
