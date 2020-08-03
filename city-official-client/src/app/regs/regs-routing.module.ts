import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegAddEditComponent } from './add-edit.component';
import { RegLayoutComponent } from './layout.component';
import { RegListComponent } from './list.component';




const routes: Routes = [
  {
      path: '', component: RegLayoutComponent,
      children: [
          { path: '', component: RegListComponent },
          { path: 'add', component: RegAddEditComponent },
          { path: 'edit/:id', component: RegAddEditComponent }
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegsRoutingModule { }
