import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  id=0
  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router,private activeRoute: ActivatedRoute) {
    this.userForm = this.fb.group({ 
      id:[this.id],
      firstName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10 digits validation
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); // Replace 'paramName' with your route parameter name
      this.id && this.getUserDetails();
    });
   
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }else{
      if(!this.id){
      this.http.post<IUser>(`${environment.URL}api/User`,this.userForm.value).subscribe({
        next: () => {
           // Success: handle the response data
           this.router.navigate(['/'])
        },
        error: (err) => {
          console.error('Error fetching user list', err);  // Handle error scenario
        }
      });
    }else{
      
      this.http.put<IUser>(`${environment.URL}api/User/${this.id}`,this.userForm.value).subscribe({
        next: () => {
           // Success: handle the response data
           this.router.navigate(['/'])
        },
        error: (err) => {
          console.error('Error fetching user list', err);  // Handle error scenario
        }
      });
    }
    }

    // Handle form submission here
    console.log(this.userForm.value);
  }

  getUserDetails():void{
    this.http.get<IUser[]>(`${environment.URL}api/User/${this.id}`).subscribe({
      next: (response) => {
        this.userForm.patchValue(response)
      },
      error: (err) => {
        console.error('Error fetching user list', err); // Handle error scenario
      },
    });
  }
}
