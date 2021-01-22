import { NgModule } from '@angular/core';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

const modules = [
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatNativeDateModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
