import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customalert',
  templateUrl: './customalert.component.html',
  styleUrls: ['./customalert.component.scss']
}) export class CustomAlertComponent implements OnInit {
  @Input() message;
  _ref: any;
  ca_title: string;
  ca_header: string;
  ca_message: string;
  InfoAlert: boolean = false;
  YesNoCancelAlert: boolean = false;
  OkCancelAlert: boolean = false;
  ConfirmCancelAlert: boolean = false;
  CriticalIcon: boolean = false;
  WarningIcon: boolean = false;
  InfoIcon: boolean = false;
  public AlertData: AlertService;
  constructor(public dialogRef: MatDialogRef<CustomAlertComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.ca_title = this.AlertData.ca_title;
    this.ca_header = this.AlertData.ca_header;
    this.ca_message = this.AlertData.ca_message;
    if (this.AlertData.AlertType === AlertTypes.Info) {
      this.InfoAlert = true;
    } else if (this.AlertData.AlertType === AlertTypes.YesNo) {
      this.YesNoCancelAlert = true;
    } else if (this.AlertData.AlertType === AlertTypes.OkCancel) {
      this.OkCancelAlert = true;
    } else if (this.AlertData.AlertType === AlertTypes.ConfirmCancel) {
      this.ConfirmCancelAlert = true;
    }
    if (this.AlertData.CriticalIcon) {
      this.CriticalIcon = true;
      this.WarningIcon = false;
      this.InfoIcon = false;
    } else if (this.AlertData.WarningIcon) {
      this.WarningIcon = true;
      this.CriticalIcon = false;
      this.InfoIcon = false;
    } else {
      this.WarningIcon = false;
      this.CriticalIcon = false;
      this.InfoIcon = true;
    }
  }

  removeObject() {
    this._ref.destroy();
  }
}

export class AlertService {
  ca_title: string;
  ca_header: string;
  ca_message: string;
  AlertType: AlertTypes;
  CriticalIcon: boolean = false;
  WarningIcon: boolean = false;
  InfoIcon: boolean = false;
}
export enum AlertTypes {
  Info = 0,
  OkCancel = 1,
  YesNo = 2,
  ConfirmCancel = 3
}
export enum IconTypes {
  Information = 0,
  Warning = 1,
  Critical = 2
}
