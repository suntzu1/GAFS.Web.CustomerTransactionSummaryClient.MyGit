import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule} from '@angular/material';

const materialModules = [
    MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class AngularMaterials { }
