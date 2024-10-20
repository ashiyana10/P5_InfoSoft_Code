import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from '../userlist/userlist.component';
import { UserAddComponent } from '../user-add/user-add.component';

const routes: Routes = [
  { path: '', component: UserlistComponent },
  { path: 'add-edit', component: UserAddComponent },
  { path: 'add-edit/:id', component: UserAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingRoutingModule { }
