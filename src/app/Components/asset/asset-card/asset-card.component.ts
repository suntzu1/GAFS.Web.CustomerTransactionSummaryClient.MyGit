import { Component, OnInit, Input } from '@angular/core';
import { Asset } from 'src/app/Models/asset';
import { Address } from 'src/app/Models/address';

@Component({
  selector: 'cts-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css']
})
export class AssetCardComponent implements OnInit {

  constructor() { }

  @Input() public assetdata: Asset;
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
}
