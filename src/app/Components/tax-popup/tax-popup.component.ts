import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'cts-tax-popup',
  templateUrl: './tax-popup.component.html',
  styleUrls: ['./tax-popup.component.css']
})
export class TaxPopupComponent implements OnInit {

  @Input() locRec: any;
  @Input() ast: any;
  constructor(
    public dialogRef: MatDialogRef<TaxPopupComponent>,
    private data: DataService
  ) { }

  ngOnInit() {
    this.locRec = this.data.AssetAddress;
    this.ast = this.data.AssetAddress;
  }

}
