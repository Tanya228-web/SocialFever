import { UserService } from './../../services/user.service';
// register.component.ts
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private service: UserService, private router: Router) {}
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),

    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onRegister() {
    if (this.registerForm.valid) {
      const userData: any = {
        name: '',
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        avatar: '',
        bio: '',
        location: '',
        password: this.registerForm.value.password,
        followers: [],
        following: [],
      };

      this.service.userRegister(userData).subscribe({
        next: (data: any) => {
          if (data) {
            this.router.navigate(['login']);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log('api completed');
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
