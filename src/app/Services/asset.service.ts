import { Injectable } from '@angular/core';
import { Asset } from '../Models/asset';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

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
