import { Component, OnInit, Inject, Input } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'cts-asset-viewer',
  templateUrl: './asset-viewer.component.html',
  styleUrls: ['./asset-viewer.component.css']
})
export class AssetViewerComponent implements OnInit {

  @Input() hideActions: boolean = false;
  allcontractsAssets: any;
  description: string;
  constructor(
    private datasvc: DataService,
    private dialogRef: MatDialogRef<AssetViewerComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.description = data.title;
  }


  ngOnInit() {
    this.datasvc.currentAssets.subscribe(acs => {
      this.allcontractsAssets = acs;
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
