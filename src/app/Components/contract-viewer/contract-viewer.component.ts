import { Component, OnInit, Inject, Input } from '@angular/core';
import { DataService } from '../../Services/data.service';

import { Contract } from 'src/app/Models/cts-api.contract';
import { MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/Models/address';

@Component({
  selector: 'cts-contract-viewer',
  templateUrl: './contract-viewer.component.html',
  styleUrls: ['./contract-viewer.component.css']
})
export class ContractViewerComponent implements OnInit {
  @Input() hideActions: boolean = false;
  showCheckBoxes = false;
  workingContract: Contract;
  orignalContract: Contract;
  description: string;
  constructor(
    private datasvc: DataService,
    private dialogRef: MatDialogRef<ContractViewerComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.description = data.title;
  }

  ngOnInit() {
    // this.datasvc.originalContract.subscribe(orignalContract => this.orignalContract = orignalContract);
    // this.datasvc.currentContract.subscribe(workingContract => this.workingContract = workingContract);
    this.orignalContract = this.datasvc.actualContract;
    this.workingContract = this.datasvc.modifiedContract;
  }
  cancel() {
    this.dialogRef.close('cancel');
  }
  accept() {
    this.dialogRef.close('accept');
  }

  ToAddressString(c: Contract): string {
    if (c == null) {
      return '';
    }
    const add2 = c.billToAddress2 && c.billToAddress2.length > 0 ? '<br/>' + c.billToAddress2 : '';
    return `${c.billToAddress1}${add2}<br/>
    ${ c.billToCity}, ${c.billToState}, ${c.billToZip}<br/>${c.billToAttnName}`;
  }

  compareAddress(c1: Contract, c2: Contract) {
    if (c1.billToAddress1 !== c2.billToAddress1) { return true; }
    if (!c1.billToAddress2) { c1.billToAddress2 = ''; }
    if (!c2.billToAddress2) { c2.billToAddress2 = ''; }
    if (c1.billToAddress2 !== c2.billToAddress2) { return true; }
    if (c1.billToCity !== c2.billToCity) { return true; }
    if (c1.lesseeState !== c2.lesseeState) { return true; }
    if (c1.lesseeZip !== c2.lesseeZip) { return true; }
    if (c1.collectionContactName !== c2.collectionContactName) { return true; }
  }
}
