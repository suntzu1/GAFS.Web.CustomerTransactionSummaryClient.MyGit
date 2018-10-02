import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Asset } from 'src/app/Models/asset';
import { Address } from 'src/app/Models/address';

@Component({
  selector: 'cts-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css']
})
export class AssetCardComponent implements OnInit {

  @Input() public assetdata: Asset;
  @Input() public noHeader: boolean;
  @Output() toggle: EventEmitter<SelAsset> = new EventEmitter();
   constructor() { }

  public assetchecked: boolean;
  public showCheckBoxes: boolean;
  public resultAssets: Asset[] = [];
  ngOnInit() {
  }
  ToAddressString(address: Address): string {
    if (address == null) {
      return '';
    }
    return `${address.StreetAddress}
    ${ address.Address2}
    ${ address.City}, ${address.State}, ${address.Zip}`;
  }
  checkChanged(asset: any) {
    this.toggle.emit({
      asset: asset,
      selected: this.assetchecked
    });
  }
}

export interface SelAsset {
  asset: Asset;
  selected: boolean;
}
