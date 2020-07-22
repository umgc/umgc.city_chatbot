import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ZonesRoutingModule } from './zones-routing.module';
import { AddComponent } from './add.component';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { EditComponent } from './edit.component';



@NgModule({
  declarations: [
    AddComponent, 
    LayoutComponent, 
    ListComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ZonesRoutingModule
  ]
})
export class ZonesModule { }
