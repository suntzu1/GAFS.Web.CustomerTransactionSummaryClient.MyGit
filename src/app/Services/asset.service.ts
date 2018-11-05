import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Asset } from '../Models/cts-api.asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  GetAllAssets(applicationId: string, ccanId: string): Observable<Asset[]> {
    return this.http
      .get(CONSTANTS.API_ASSETS_GET)
      .pipe(map(resp =>
        resp as Asset[] || []
        ));
  }
}
