import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add-edit.component';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';



@NgModule({
  declarations: [AddEditComponent, LayoutComponent, ListComponent],
  imports: [
    CommonModule
  ]
})
export class PermitsModule { }
