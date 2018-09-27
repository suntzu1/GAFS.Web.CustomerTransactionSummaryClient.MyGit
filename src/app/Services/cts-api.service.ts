import { Injectable } from '@angular/core';
import { Contract } from '../Models/contract';
import { Http } from '@angular/http';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CtsApiService {

  constructor(private http: Http) { }

}
