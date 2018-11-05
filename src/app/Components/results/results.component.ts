import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AlertTypes, IconTypes, CustomAlertComponent } from '../CustomAlert/customalert.component';
import { MatDialog, MatTab } from '@angular/material';
import { CommonfunctionsModule } from '../../commonfunctions/commonfunctions.module';
import { CtsApiService } from 'src/app/Services/cts-api.service';
import { DataService } from 'src/app/Services/data.service';
import { ContractComponent } from '../contract/contract.component';
import { Contract } from 'src/app/Models/cts-api.contract';
import { map } from 'rxjs/operators';
import { AssetComponent } from '../asset/asset.component';
import { Observable } from 'rxjs/internal/observable';
// import 'rxjs/add/observable/forkJoin';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
@Component({
  selector: 'cts-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @ViewChild(ContractComponent)
  private compcontract: ContractComponent;
  @ViewChild(AssetComponent)
  private compasset: AssetComponent;
  tab = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cmnfn: CommonfunctionsModule,
    private ctsapi: CtsApiService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.ResetAllStoredData();
    this.route.paramMap.subscribe(params => {
      const func = params.get('function');
      const id = params.get('id');
      if (!func || !id || func === '' || id === '') {
        return;
      }
      switch (func) {
        case 'application':
          this.ctsapi.GetByApplicationId(id).subscribe(
            (resp) => {
              this.data.loadedApplication = resp.message.applicationInfo;
              console.log(resp);
              // todo: sunil 11/05/2018 - change this to by application id
              this.ctsapi.GetContractsByCustomerId(resp.message.applicationInfo.applications[0].applicationId.toString()).subscribe(
                (resp2) => {
                  this.AddBillingAddress(resp2.message.contractInfo.contracts);
                  // todo: sunil 11/05/2018 - need to remove respcontracts ??? why the need for 2?
                  this.data.respcontracts = resp2.message.contractInfo.contracts;
                  this.data.loadedContracts = Object.assign([], resp2.message.contractInfo.contracts);
                  this.compcontract.applyResult();
                }
              );
            }
          );
          break;
        case 'ccan':
          this.ctsapi.GetByCustomerId(id, this.data.dealerlist, this.data.incldc).subscribe(
            (resp) => {
              console.log(resp);
              this.AddBillingAddress(resp.message.contractInfo.contracts);
              this.data.loadedContracts = resp.message.contractInfo.contracts;
              this.compcontract.applyResult();
            }
          );
          break;
      }
    });
  }

  getAssetsForContracts() {
    const assets = [];
    const cs: Observable<any>[] = [];
    this.data.loadedContracts.map(c => {
      cs.push(this.ctsapi.GetAssetsByContractId(c.contractId));
    });
    forkJoin(cs)
      .subscribe(data => {
        console.log(data[0].message.assetInfo.contracts[0].assets[0]);
        data.forEach(n => {
          n.message.assetInfo.contracts.forEach(c => {
            c.assets.forEach(a => {
              a['ContractNumber'] = c.contractId;
              assets.push(a);
            });
          });
        });
        this.data.loadedAssets = assets;
        this.compasset.applyResult();
      });
  }

  AddBillingAddress(contracts: Contract[]) {
    contracts.map(
      (contract) => {
        contract['BillingAddress'] =
          (contract.billToName && contract.billToName !== '' ? contract.billToName + '<br/>' : '') +
          (contract.billToAddress1 && contract.billToAddress1 !== '' ? contract.billToAddress1 : '') +
          (contract.billToAddress2 && contract.billToAddress2 !== '' ? ' ' + contract.billToAddress2 : '') + '<br/>' +
          (contract.billToCity && contract.billToCity !== '' ? contract.billToCity + ', ' : '') +
          (contract.billToState && contract.billToState !== '' ? contract.billToState + ', ' : '') +
          (contract.billToZip && contract.billToZip !== '' ? contract.billToZip : '') +
          (contract.billToAttnName && contract.billToAttnName !== '' ? '<br/>' + contract.billToAttnName : '');
      }
    );
  }
  gobacktosearch() {
    this.router.navigateByUrl('/search');
  }

  onbackpressed() {
    const cusAlert = this.cmnfn.showAlert(this.dialog,
      'WARNING', 'Are you sure you want to go back to search?',
      'Any selection(s) made will be lost.', IconTypes.Warning, AlertTypes.OkCancel);
    cusAlert.afterClosed().subscribe((data) => {
      if (data === 'ok') {
        this.router.navigateByUrl('/search');
      }
    });
  }
  selectedTabChange(e) {
    switch (this.tab) {
      case 0:
        this.compcontract.applyResult();
        break;
      case 1:
        this.getAssetsForContracts();
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }
}
