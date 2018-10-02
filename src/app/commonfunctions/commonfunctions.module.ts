import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { IconTypes, AlertTypes, CustomAlertComponent } from '../Components/CustomAlert/customalert.component';
import { MatDialog } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
  // declarations: [CustomAlertComponent],
  // exports: [CustomAlertComponent]
})
export class CommonfunctionsModule {

  // showAlert(dialog: MatDialog, title: string, header: string, message: string,
  //   icon: IconTypes = IconTypes.Information,
  //   alertType: AlertTypes = AlertTypes.Info) {
  //   const cusAlert = dialog.open(CustomAlertComponent);
  //   cusAlert.componentInstance.AlertData = {
  //     ca_title: title,
  //     ca_header: header,
  //     ca_message: message,
  //     CriticalIcon: (icon === IconTypes.Critical),
  //     WarningIcon: (icon === IconTypes.Warning),
  //     InfoIcon: (icon === IconTypes.Information),
  //     AlertType: alertType
  //   };
  //   return cusAlert;
  // }
}
