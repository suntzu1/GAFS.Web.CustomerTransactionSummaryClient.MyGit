import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './Components/search/search.component';
import { ResultsComponent } from './Components/results/results.component';
import { ContractComponent } from './Components/contract/contract.component';
import { AssetComponent } from './Components/asset/asset.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { UsageComponent } from './Components/usage/usage.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MaterialGridComponent } from './Components/MaterialGrid/material-grid.component';

import { Routing } from './app.routing';

import { YesNo } from './Pipes/YesNo';

import {
  MatTableModule, MatPaginatorModule, MatInputModule, MatProgressSpinnerModule, MatSortModule, MatDialogModule
} from '@angular/material';
import { CustomAlertComponent } from './Components/CustomAlert/customalert.component';
import { AssetCardComponent } from './Components/asset/asset-card/asset-card.component';
import { PaymentCardComponent } from './Components/payment/payment-card/payment-card.component';
import { DataTransferConfirmationComponent } from './Components/data-transfer-confirmation/data-transfer-confirmation.component';


const matmodules = [
  MatTableModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatDialogModule
];
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    ContractComponent,
    AssetComponent,
    PaymentComponent,
    UsageComponent,
    CustomAlertComponent,
    YesNo,
    AssetCardComponent,
    PaymentCardComponent,
    MaterialGridComponent,
    DataTransferConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Routing, FormsModule, matmodules,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    CustomAlertComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }