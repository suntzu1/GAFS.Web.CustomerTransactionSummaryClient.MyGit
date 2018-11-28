import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'cts-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() showButtons: boolean = false;
  @Output() toolbuttonClicked: EventEmitter<string> = new EventEmitter();

  constructor(
    private data: DataService
  ) {
  }

  ngOnInit() {
  }
  onBackPressed() { this.toolbuttonClicked.emit('Back'); }
  sendContractData() { this.toolbuttonClicked.emit('SendContract'); }
  sendContractAssetData() { this.toolbuttonClicked.emit('SendContractAsset'); }
  sendAssetContractData() { this.toolbuttonClicked.emit('SendAssetContract'); }
  clearAllContractSelections() { this.toolbuttonClicked.emit('ClearContract'); }
  sendAssetData() { this.toolbuttonClicked.emit('SendAsset'); }
  clearAllAssetSelections() { this.toolbuttonClicked.emit('ClearAsset'); }

  public getContext(): string {
    return this.data.tabContext;
  }
}
