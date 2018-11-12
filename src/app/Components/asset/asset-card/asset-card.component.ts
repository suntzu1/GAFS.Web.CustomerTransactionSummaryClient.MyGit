import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Asset } from 'src/app/Models/asset';
import { Address } from 'src/app/Models/address';
import { Asset } from 'src/app/Models/cts-api.asset';
import { DataService } from 'src/app/Services/data.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TaxPopupComponent } from '../../tax-popup/tax-popup.component';

@Component({
  selector: 'cts-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css']
})
export class AssetCardComponent implements OnInit {

  @Input() public assetdata: Asset;
  @Input() public noHeader: boolean;
  @Input() assetchecked: boolean;
  @Output() toggle: EventEmitter<SelAsset> = new EventEmitter();
  constructor(
    private data: DataService,
    public dialog: MatDialog
  ) { }

  public showCheckBoxes: boolean;
  public resultAssets: Asset[] = [];
  ngOnInit() {
  }
  ToAddressString(address: any): string {
    if (address == null) {
      return '';
    }
    return `${address.currentEquipmentAddress1}
    ${ address.currentEquipmentAddress2}
    ${ address.currentEquipmentCity}, ${address.currentEquipmentState}, ${address.currentEquipmentZip}`;
  }
  checkChanged(asset: any) {
    this.toggle.emit({
      asset: asset,
      selected: this.assetchecked
    });
  }
  showAddress(a) {
    this.data.AssetAddress = a;
    const diaCnfg: MatDialogConfig = {
      disableClose: true,
      autoFocus: true
    };
    diaCnfg.data = {
      title: ''
    };
    const dialogRef = this.dialog.open(TaxPopupComponent, diaCnfg);
  }
}

export interface SelAsset {
  asset: Asset;
  selected: boolean;
}
