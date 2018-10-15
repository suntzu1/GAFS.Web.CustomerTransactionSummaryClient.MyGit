import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './Components/search/search.component';
import {ResultsComponent } from '../app/Components/results/results.component';
import { AssetComponent } from './Components/asset/asset.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { DataTransferConfirmationComponent } from './Components/data-transfer-confirmation/data-transfer-confirmation.component';

const appRoutes: Routes = [
    { path: '', component: SearchComponent, pathMatch: 'full' },
    { path: 'search', component: SearchComponent, pathMatch: 'full' },
    { path: 'results', component: ResultsComponent, pathMatch: 'full' },
    { path: 'results/:function/:id', component: ResultsComponent, pathMatch: 'full' },
    { path: 'assets', component: AssetComponent, pathMatch: 'full' },
    { path: 'payment', component: PaymentComponent, pathMatch: 'full' },
    { path: 'dtconfirm', component: DataTransferConfirmationComponent, pathMatch: 'full'},
    { path: '**', component: SearchComponent },
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
