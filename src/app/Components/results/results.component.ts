import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { AlertTypes, IconTypes, CustomAlertComponent } from '../CustomAlert/customalert.component';
import { MatDialog } from '@angular/material';
import { CommonfunctionsModule } from '../../commonfunctions/commonfunctions.module';

@Component({
  selector: 'cts-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  tab = 0;
  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private cmnfn: CommonfunctionsModule
  ) { }

  ngOnInit() {
  }
  gobacktosearch() {
    this.router.navigateByUrl('/search');
  }

  onbackpressed() {
    const cusAlert = this.cmnfn.showAlert(this.dialog, 
      'WARNING', 'Are you sure you want to go back to search?',
      'Any selection(s) made will be lost.', IconTypes.Warning, AlertTypes.OkCancel);
    cusAlert.afterClosed().subscribe((data) => {
      if (data === 'ok') {
        this.router.navigateByUrl('/search');
      }
    });
  }
}
