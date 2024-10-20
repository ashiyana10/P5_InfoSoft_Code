import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingRoutingModule } from './todo-routing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from '../todo-list/todo-list.component';


@NgModule({
  declarations: [TodoListComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoRoutingModule { }
