import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermitLayoutComponent } from './layout.component';
import { PermitListComponent } from './list.component';
import { PermitAddEditComponent } from './add-edit.component';

const routes: Routes = [
    {
        path: '', component: PermitLayoutComponent,
        children: [
            { path: '', component: PermitListComponent },
            { path: 'add', component: PermitAddEditComponent },
            { path: 'edit/:id', component: PermitAddEditComponent },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PermitsRoutingModule { }