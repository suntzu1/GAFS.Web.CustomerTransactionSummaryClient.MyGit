import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material-grid',
  templateUrl: './material-grid.component.html',
  styleUrls: ['./material-grid.component.css']
})
export class MaterialGridComponent implements OnInit {

  @Input() dataSource;
  @Input() displayedColumns: colkeydis[];
  @Input() fixheader: boolean;
  @Input() addactions: boolean;
  @Input() gridbuttons: string[];

  public displayedCols: string[];

  isRowEditMode: boolean = false;
  editId: number = 0;
  showDelButton: boolean = false;
  constructor() { }

  ngOnInit() {
    this.displayedCols = this.displayedColumns.map((i) => {
      return i.key;
    });
    if (this.addactions) { this.displayedCols.push('actions'); }
    if (this.gridbuttons) {
      this.displayedCols.push('gridbuttons');
      this.showDelButton = this.gridbuttons.includes('delete');
    }
  }

  public isEditMode(row) {
    return this.isRowEditMode && this.editId === row.position;
  }

  public setRowInEdit(row) {
    this.editId = row.position;
    this.isRowEditMode = true;
  }

  public setRowEditCancel() {
    this.editId = -1;
    this.isRowEditMode = false;
  }

  public deleteRow(element) {
    console.log(element);
  }
}

// tslint:disable-next-line:class-name
export interface colkeydis {
  key: string;
  display: string;
}
