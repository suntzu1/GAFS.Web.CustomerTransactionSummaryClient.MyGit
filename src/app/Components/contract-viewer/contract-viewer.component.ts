import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../Services/data.service';

import { Contract } from 'src/app/Models/contract';
import { MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/Models/address';

@Component({
  selector: 'cts-contract-viewer',
  templateUrl: './contract-viewer.component.html',
  styleUrls: ['./contract-viewer.component.css']
})
export class ContractViewerComponent implements OnInit {

  workingContract: Contract;
  description: string;
  constructor(
    private datasvc: DataService,
    private dialogRef: MatDialogRef<ContractViewerComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.description = data.title;
  }

  ToAddressString(address: Address): string {
    if (address == null) {
      return '';
    }
    return `${address.StreetAddress} ${address.Address2}<br/>
    ${ address.City}, ${address.State}, ${address.Zip}<br/>${address.Contact}`;
  }

  ngOnInit() {
    this.datasvc.currentContract.subscribe(workingContract => this.workingContract = workingContract);
  }
  cancel() {
    this.dialogRef.close('cancel');
  }
  accept() {
    this.dialogRef.close('accept');
  }
}
