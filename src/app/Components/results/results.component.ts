import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AlertTypes, IconTypes, CustomAlertComponent } from '../CustomAlert/customalert.component';
import { MatDialog } from '@angular/material';
import { CommonfunctionsModule } from '../../commonfunctions/commonfunctions.module';
import { CtsApiService } from 'src/app/Services/cts-api.service';
import { DataService } from 'src/app/Services/data.service';
import { ContractComponent } from '../contract/contract.component';

@Component({
  selector: 'cts-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @ViewChild(ContractComponent)
  private compcontract: ContractComponent;
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
    this.route.paramMap.subscribe(params => {
      const func = params.get('function');
      const id = params.get('id');
      if (!func || !id || func === '' || id === '') {
        return;
      }
      debugger;
      switch (func) {
        case 'application':
          this.ctsapi.GetByApplicationId(id).subscribe(
            (resp) => {
              debugger;
              console.log(resp);
              this.data.respcontracts = resp.message.contractInfo.contracts;
              this.compcontract.applyResult();
            }
          );
          break;
        case 'ccan':
          this.ctsapi.GetByCustomerId(id, this.data.dealerlist, this.data.incldc).subscribe(
            (resp) => {
              debugger;
              console.log(resp);
              this.data.respcontracts = resp.message.contractInfo.contracts;
              this.compcontract.applyResult();
            }
          );
          break;
      }
    });
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
}
