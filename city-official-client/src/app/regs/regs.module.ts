import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RegsRoutingModule } from './regs-routing.module';
import { RegLayoutComponent } from './layout.component';
import { RegListComponent } from './list.component';
import { RegAddEditComponent } from './add-edit.component';

@NgModule({
    declarations: [
      RegLayoutComponent,
      RegListComponent,
      RegAddEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RegsRoutingModule
    ]    
})
export class RegsModule { }