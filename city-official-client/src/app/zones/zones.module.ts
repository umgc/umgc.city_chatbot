import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ZonesRoutingModule } from './zones-routing.module';
import { AddEditComponent } from './add-edit.component';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { MapComponent } from './map.component';



@NgModule({
  declarations: [
    AddEditComponent, 
    LayoutComponent, 
    ListComponent, 
    MapComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ZonesRoutingModule
  ]
})
export class ZonesModule { }
