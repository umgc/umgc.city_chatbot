import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ]    
})
export class UsersModule {
    
 }