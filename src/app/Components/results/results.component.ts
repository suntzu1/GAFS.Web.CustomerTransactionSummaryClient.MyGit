import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { AlertTypes, CustomAlertComponent, IconTypes } from '../CustomAlert/customalert.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cts-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  tab = 0;
  constructor(private router: Router,   private dialog: MatDialog
    ) { }

  ngOnInit() {
  }
  gobacktosearch() {
    this.router.navigateByUrl('/search');
  }

  onbackpressed() {
    const cusAlert = this.showAlert('WARNING', 'Are you sure you want to go back to search?',
      'Any selection(s) made will be lost.', IconTypes.Warning, AlertTypes.OkCancel);
    cusAlert.afterClosed().subscribe((data) => {
      if (data === 'ok') {
        this.router.navigateByUrl('/search');
      }
    });
  }

  showAlert(title, header, message, icon = IconTypes.Information, alertType = AlertTypes.Info) {
    const cusAlert = this.dialog.open(CustomAlertComponent);
    cusAlert.componentInstance.AlertData = {
      ca_title: title,
      ca_header: header,
      ca_message: message,
      CriticalIcon: (icon === IconTypes.Critical),
      WarningIcon: (icon === IconTypes.Warning),
      InfoIcon: (icon === IconTypes.Information),
      AlertType: alertType
    };
    return cusAlert;
  }
}
