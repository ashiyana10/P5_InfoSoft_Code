import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingRoutingModule } from './user-routing-routing.module';
import { UserlistComponent } from '../userlist/userlist.component';
import { UserAddComponent } from '../user-add/user-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserlistComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    UserRoutingRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class UserRoutingModule { }
