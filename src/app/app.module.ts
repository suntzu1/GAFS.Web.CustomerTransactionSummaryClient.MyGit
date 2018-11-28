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
import { Cycle } from './Pipes/Cycle';

import {
  MatTableModule, MatPaginatorModule, MatInputModule, MatProgressSpinnerModule, MatSortModule, MatDialogModule, MatDialogContent, MatTabsModule
} from '@angular/material';
// import { CustomAlertComponent } from './Components/CustomAlert/customalert.component';
import { AssetCardComponent } from './Components/asset/asset-card/asset-card.component';
import { PaymentCardComponent } from './Components/payment/payment-card/payment-card.component';
import { DataTransferConfirmationComponent } from './Components/data-transfer-confirmation/data-transfer-confirmation.component';
// import { AssetService } from './Services/asset.service';
// import { ContractService } from './Services/contract.service';
import { PaymentService } from './Services/payment.service';
import { UsageService } from './Services/usage.service';
import { CtsApiService } from './Services/cts-api.service';

import { HttpClientModule } from '@angular/common/http';
import { ContractViewerComponent } from './Components/contract-viewer/contract-viewer.component';
import { CommonfunctionsModule } from 'src/app/commonfunctions/commonfunctions.module';
import { AssetViewerComponent } from './Components/asset-viewer/asset-viewer.component';
import { ContractAssetViewerComponent } from './Components/contract-asset-viewer/contract-asset-viewer.component';
import { TaxPopupComponent } from './Components/tax-popup/tax-popup.component';
import { ProgressloaderComponent } from './Components/progressloader/progressloader.component';
import { LoaderService } from './Services/loader-service';
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
// AssetService, , ContractService
const appservices = [
  PaymentService, UsageService, CtsApiService
];

const matmodules = [
  MatTableModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatDialogModule, MatTabsModule
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
    // CustomAlertComponent,
    YesNo,
    Cycle,
    AssetCardComponent,
    PaymentCardComponent,
    MaterialGridComponent,
    DataTransferConfirmationComponent,
    ContractViewerComponent,
    AssetViewerComponent,
    ContractAssetViewerComponent,
    TaxPopupComponent,
    ProgressloaderComponent,
    ToolbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    Routing, FormsModule, matmodules,
    CommonfunctionsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    ProgressloaderComponent
  ],
  entryComponents: [
    // CustomAlertComponent,
    ContractViewerComponent,
    AssetViewerComponent,
    ContractAssetViewerComponent,
    TaxPopupComponent
  ],
  providers: [
    appservices,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
