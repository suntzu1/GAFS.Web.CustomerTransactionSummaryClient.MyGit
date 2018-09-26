import { Injectable } from '@angular/core';
import { Contract } from '../Models/contract';
import { TempData } from '../Services/data';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  tempdata: TempData;
  constructor() { }

  public GetAllContracts(applicationId: string, ccanId: string): Contract[] {
    if (applicationId) {
      return this.tempdata.GetContracts();
    }
    return [];
  }
}
