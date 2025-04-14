import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private service: UserService, private router: Router) {}

  loginform = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  onLogin() {
    if (this.loginform.valid) {

  
      this.service.userLogin(this.loginform.value).subscribe({
        next: (data: any) => {
          console.log("data",data)
        
          if(data.length==1){
          this.service.setLocalStorage('user',data)
          this.router.navigate(['']);
        }
        },
        error: (error) => {
          console.log('error', error);
        },
        complete: () => {
          console.log('completed login successfully');
        },
      });
    } else {
      this.loginform.markAllAsTouched();
    }
  }
}
