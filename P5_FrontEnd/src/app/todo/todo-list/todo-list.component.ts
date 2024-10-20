import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITodoTaks } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  toDoTask?:ITodoTaks[];
  id=0
  todoForm!: FormGroup;
  submitted = false;

  constructor(private http: HttpClient, private router: Router,private activeRoute: ActivatedRoute,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); // Replace 'paramName' with your route parameter name
      this.id && this.getTaskDetails()
      
    });
    this.todoForm = this.formBuilder.group({
      userId:[this.id],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dueDate: ['', [Validators.required, this.dateRangeValidator]],
      status: ['', Validators.required]
    });
    
  }
  dateRangeValidator(control: any) {
    const today = new Date();
    const dueDate = new Date(control.value);
    const oneMonthFromToday = new Date(today);
    oneMonthFromToday.setMonth(today.getMonth() + 1);
    
    if (dueDate < today || dueDate > oneMonthFromToday) {
      return { dateRange: true };
    }
    return null;
  }
  getTaskDetails():void{
    this.http.get<ITodoTaks[]>(`${environment.URL}api/Todo/${this.id}`).subscribe({
      next: (response) => {
        this.toDoTask = response; // Success: handle the response data
      },
      error: (err) => {
        console.error('Error fetching user list', err); // Handle error scenario
      },
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.todoForm.invalid) {
      return;
    }else{
      this.http.post<ITodoTaks>(`${environment.URL}api/Todo`,this.todoForm.value).subscribe({
        next: () => {
           // Success: handle the response data
           this.router.navigate([`/todo/${this.id}`])
           this.todoForm.reset();
           this.todoForm.controls['userId'].setValue(this.id);
           this.submitted = false;
           this.getTaskDetails();
        },
        error: (err) => {
          console.error('Error fetching user list', err);  // Handle error scenario
        }
      });
    }

    console.log(this.todoForm.value);
    // Close modal or reset form logic here
  
  }

}
