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
        case 's_application':
          this.data.showCheckBoxes = false;
          this.ctsapi.GetContractsByApplicationId(id).subscribe(
            (resp) => {
              if (!this.validResponse(resp, 'c')) {
                return;
              }
              this.processLoadedContracts(resp);
            }
          );
          break;
        case 'application':
          this.data.showCheckBoxes = true;
          this.ctsapi.GetApplicationByApplicationId(id).subscribe(
            (resp) => {
              if (!this.validResponse(resp, 'a')) {
                return;
              }
              this.data.loadedApplication = resp.message.applicationInfo;
              // todo: sunil 11/05/2018 - change this to by application id
              this.ctsapi.GetContractsByCustomerId(resp.message.applicationInfo.applications[0].applicationId.toString()).subscribe(
                (resp2) => {
                  this.processLoadedContracts(resp2);
                }
              );
            }
          );
          break;
        case 'ccan':
          this.data.showCheckBoxes = false;
          this.ctsapi.GetByCustomerId(id, this.data.dealerlist, this.data.incldc).subscribe(
            (resp) => {
              this.processLoadedContracts(resp);
            }
          );
          break;
      }
    });
  }

  validResponse(resp, i): boolean {
    if (resp.message instanceof Object) {
      if (i === 'a') {
        if (resp.message.applicationInfo.customerId < 1 || resp.message.applicationInfo.applications.length < 0) {
          this.cmnfn.showAlert(this.dialog, 'Information', '',
            'No results found.', IconTypes.Information, AlertTypes.Info);
        } else {
          return true;
        }
      } else if (i === 'c') {
        if (resp.message.contractInfo.customerId < 1 || resp.message.contractInfo.contracts.length < 0) {
          this.cmnfn.showAlert(this.dialog, 'Information', '',
            'No results found.', IconTypes.Information, AlertTypes.Info);
        } else {
          return true;
        }
      }
    } else {
      this.cmnfn.showAlert(this.dialog, 'Error', '',
        resp.message, IconTypes.Critical, AlertTypes.Info);
    }
    return false;
  }

  showCheckBoxes(): boolean {
    return this.data.showCheckBoxes;
  }

  clearAllSelections(i) {
    if (i === 0) {
      this.compcontract.clearAllSelections();
    } else if (i === 1) {
      this.compasset.clearAllSelections();
    }
  }

  processLoadedContracts(res) {
    this.AddBillingAddress(res.message.contractInfo.contracts);
    // todo: sunil 11/05/2018 - need to remove respcontracts ??? why the need for 2?
    this.data.respcontracts = res.message.contractInfo.contracts;
    this.data.loadedContracts = Object.assign([], res.message.contractInfo.contracts);
    this.compcontract.applyResult();
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
    if (this.data.showCheckBoxes === false) {
      this.router.navigateByUrl('/search');
    } else {
      const cusAlert = this.cmnfn.showAlert(this.dialog,
        'WARNING', 'Are you sure you want to go back to search?',
        'Any selection(s) made will be lost.', IconTypes.Warning, AlertTypes.OkCancel);
      cusAlert.afterClosed().subscribe((data) => {
        if (data === 'ok') {
          this.router.navigateByUrl('/search');
        }
      });
    }
  }
  selectedTabChange(e) {
    switch (this.tab) {
      case 0:
        if (this.data.loadedContracts !== null && this.data.loadedContracts.length > 0) {
          this.data.respcontracts = Object.assign([], this.data.loadedContracts);
          this.compcontract.applyResult();
        } else {
          // have to think of this condition???
        }
        break;
      case 1:
        debugger;
        this.compcontract.storeState();
        if (this.data.loadedAssets !== null && this.data.loadedAssets.length > 0) {
          this.compasset.applyResult();
        } else {
          this.getAssetsForContracts();
        }
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }
}
