import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  userList: IUser[]=[];
  selectedFilter: string = '';
  filteredUsers: IUser[]=[]; // Initialize with all users
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUserList();
  }

  getUserList(): void {
    this.http.get<IUser[]>(`${environment.URL}api/User`).subscribe({
      next: (response) => {
        this.userList = response; // Success: handle the response data
        this.filteredUsers=response;
      },
      error: (err) => {
        console.error('Error fetching user list', err); // Handle error scenario
      },
    });
  }

  editUser(id: number): void {
    this.router.navigate([`/user/add-edit/${id}`]);
  }

  manageTodos(id:number):void{
    this.router.navigate([`/todo/${id}`]);
  }
  
  filterUsers() {
    if (!this.selectedFilter) {
      this.filteredUsers = this.userList; // Reset to all users if no filter is selected
      return;
    }

    switch (this.selectedFilter) {
      case 'lessThan5':
        this.filteredUsers = this.userList.filter(user => user.todos.length < 5);
        break;
      case 'lessThan10':
        this.filteredUsers = this.userList.filter(user => user.todos.length < 10);
        break;
      case 'moreThan25':
        this.filteredUsers = this.userList.filter(user => user.todos.length > 25);
        break;
      default:
        this.filteredUsers = this.userList; // Reset to all users for any invalid option
        break;
    }
  }
}
