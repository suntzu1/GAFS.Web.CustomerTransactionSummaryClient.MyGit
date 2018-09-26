import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AlertTypes } from '../CustomAlert/customalert.component';
// import {} from '../../../app/Components/results/results.component'

@Component({
  selector: 'cts-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tab = 0;
  constructor(private router: Router) { }

  showDealerList = false;

  private appCom: AppComponent;

  public searchparams: any;

  dealerlist = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit() {
    this.searchparams = {};
    this.clearsearch();
    this.dealerlist = [
      { item_id: 1, item_text: 'All Star Equipment' },
      { item_id: 2, item_text: 'Extra Deals' },
      { item_id: 3, item_text: 'Office Essentials' },
      { item_id: 4, item_text: 'Plot Perfect' },
      { item_id: 5, item_text: 'Ultimate Deals' }
    ];
    this.searchparams.dealers = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Deselect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
  onItemSelect (item: any) {
    console.log(item);
  }
  onSelectAll (items: any) {
    console.log(items);
  }
  clearsearch() {
    this.searchparams.appid = '';
    this.searchparams.ccan = '';
    this.searchparams.incldc = 'no';
    this.searchparams.dealers = [];
    this.showDealerList = false;
  }
  onappidsearchclick() {
    this.router.navigateByUrl('/results');
  }

}
