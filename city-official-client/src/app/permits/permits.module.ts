import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PermitsRoutingModule } from './permits-routing.module';
import { PermitLayoutComponent } from './layout.component';
import { PermitListComponent } from './list.component';
import { PermitAddEditComponent } from './add-edit.component';

@NgModule({
    declarations: [
        PermitLayoutComponent,
        PermitListComponent,
        PermitAddEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PermitsRoutingModule
    ]    
})
export class PermitsModule { }