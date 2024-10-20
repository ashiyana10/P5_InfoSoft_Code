import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./user/user-routing/user-routing-routing.module').then(m => m.UserRoutingRoutingModule) },

  { path: 'todo', loadChildren: () => import('./todo/todo-routing/todo-routing-routing.module').then(m => m.TodoRoutingRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
