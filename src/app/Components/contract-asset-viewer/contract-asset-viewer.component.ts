import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssetViewerComponent } from '../asset-viewer/asset-viewer.component';
import { Contract } from 'src/app/Models/contract';

@Component({
  selector: 'cts-contract-asset-viewer',
  templateUrl: './contract-asset-viewer.component.html',
  styleUrls: ['./contract-asset-viewer.component.css']
})
export class ContractAssetViewerComponent implements OnInit {
  showCheckBoxes = false;
  workingContract: Contract;
  allcontractsAssets: any;
  description: string;
  constructor(
    private datasvc: DataService,
    private dialogRef: MatDialogRef<ContractAssetViewerComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) { }

  ngOnInit() {
    this.datasvc.currentAssets.subscribe(acs => {
      this.allcontractsAssets = acs;
    }
    );
    this.datasvc.currentContract.subscribe(workingContract => {
      this.workingContract = workingContract;
    }
    );
  }
  cancel() {
    this.dialogRef.close('cancel');
  }
  accept() {
    this.dialogRef.close('accept');
  }

}
