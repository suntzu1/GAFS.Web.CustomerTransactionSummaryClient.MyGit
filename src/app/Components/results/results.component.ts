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
import { ApplicationInfo } from '../../Models/cts-api';
import { LoaderService } from 'src/app/Services/loader-service';

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
    private data: DataService,
    private loader: LoaderService
  ) {
    this.data.tabContext = 'Contract';
  }

  ngOnInit() {
    this.loader.show();
    this.data.ResetAllStoredData();
    this.route.paramMap.subscribe(params => {
      const func = params.get('function');
      const id = params.get('id');
      const ccan = params.get('ccan');
      if (!func || !id || func === '' || id === '') {
        return;
      }
      switch (func) {
        case 's_application':
          // search by application id
          this.data.showCheckBoxes = false;
          this.data.loadedApplication = null;
          this.ctsapi.GetContractsByApplicationId(id).subscribe(
            (resp) => {
              if (!this.validResponse(resp, 'c')) {
                this.loader.hide();
                return;
              }
              this.processLoadedContracts(resp);
            }, error => this.responseError(error)
          );
          break;
        case 'application':
          // entry from an external app by application id
          this.ExternalApplicationLoad(id);
          break;
        case 'ccan':
          // search by customer id and dealer list
          this.data.showCheckBoxes = false;
          this.ctsapi.GetByCustomerId(id, this.data.dealerlist, this.data.incldc).subscribe(
            (resp) => {
              this.processLoadedContracts(resp);
            }, error => this.responseError(error)
          );
          break;
      }
    });
  }

  LesseeDBA() {
    if (this.data.loadedApplication) { return this.data.loadedApplication.customerDBA; }
  }

  LesseeName() {
    if (this.data.loadedApplication
      && this.data.loadedApplication.applications
      && this.data.loadedApplication.applications[0]) {
      return this.data.loadedApplication.applications[0].lesseeName;
    }
  }

  private ExternalApplicationLoad(id: string) {
    this.data.showCheckBoxes = true;
    this.ctsapi.GetApplicationByApplicationId(id).subscribe((resp) => {
      if (!this.validResponse(resp, 'a')) {
        this.loader.hide();
        return;
      }
      this.data.loadedApplication = resp.message.applicationInfo;
      this.ctsapi.GetContractsByCustomerId(resp.message.applicationInfo.customerId.toString()).subscribe((resp2) => {
        this.processLoadedContracts(resp2);
      }, error => this.responseError(error)
      );
    }, error => this.responseError(error)
    );
  }

  responseError(ex) {
    this.cmnfn.showAlert(this.dialog, 'Error', '', ex, IconTypes.Critical, AlertTypes.Info);
    this.compcontract.applyResult();
  }

  doRefresh(appid) {
    this.ExternalApplicationLoad(appid);
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

  // processLoadedContracts1(res) {
  //   res.message.contractInfo.contracts.forEach(c => {
  //     c.customerDBA = res.message.contractInfo.customerDBA;
  //   });
  // }

  processLoadedContracts(res) {
    if (!res.message.contractInfo) {
      this.data.loadedContracts = [];
      this.data.respcontracts = [];
    } else {
      // this.processLoadedContracts1(res);
      this.AddBillingAddress(res.message.contractInfo.contracts);
      const resCons: Contract[] = res.message.contractInfo.contracts;
      this.data.respcontracts = resCons.sort((a, b) => {
        return <any>new Date(b.bookingDate) - <any>new Date(a.bookingDate);
      });
      this.data.loadedContracts = Object.assign([], this.data.respcontracts);
    }
    if (this.compcontract) { this.compcontract.applyResult(); }
    if (this.compasset) { this.getAssetsForContracts(); }
  }

  getAssetsForContracts() {
    const assets = [];
    const cs: Observable<any>[] = [];
    this.data.loadedContracts.map(c => {
      cs.push(this.ctsapi.GetAssetsByContractId(c.contractId));
    });
    forkJoin(cs)
      .subscribe(data => {
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
      }, error => this.responseError(error)
      );
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
    this.loader.show();
    switch (this.tab) {
      case 0:
        this.data.tabContext = 'Contract';
        this.storeDataBeforeNav();
        if ((this.data.loadedApplication) ||
          (this.data.loadedContracts !== null && this.data.loadedContracts.length > 0)) {
          this.data.respcontracts = Object.assign([], this.data.loadedContracts);
          this.compcontract.applyResult();
        } else {
          // have to think of this condition???
        }
        break;
      case 1:
        this.data.tabContext = 'Asset';
        this.storeDataBeforeNav();
        if (this.data.loadedAssets !== null && this.data.loadedAssets.length > 0) {
          this.compasset.applyResult();
        } else {
          this.getAssetsForContracts();
        }
        break;
      case 2:
        this.data.tabContext = 'Payment';
        this.storeDataBeforeNav();
        // todo: remove this hide once proper payment process is implemented
        this.loader.hide();
        break;
      case 3:
        this.data.tabContext = 'Usage';
        this.storeDataBeforeNav();
        // todo: remove this hide once proper usage process is implemented
        this.loader.hide();
        break;
    }
  }

  storeDataBeforeNav() {
    if (this.compasset) { this.compasset.storeState(); }
    if (this.compcontract) { this.compcontract.storeState(); }
  }

  toolbuttonClicked(e) {
    switch (e) {
      case 'Back':
        this.onbackpressed();
        break;
      case 'SendContract':
        this.compcontract.sendContractData();
        break;
      case 'SendContractAsset':
        this.compcontract.sendContractAssetData();
        break;
      case 'ClearContract':
        this.clearAllSelections(0);
        break;
      case 'SendAsset':
        this.compasset.sendAssetData();
        break;
      case 'SendAssetContract':
        this.compasset.sendContractAssetData();
        break;
      case 'ClearAsset':
        this.clearAllSelections(1);
        break;
      default:
        break;
    }
  }
}
