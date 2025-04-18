import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {
  obj: any = {};
  constructor(private userService: UserService,private router:Router) {}
  forgotPasswordForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  onSubmit() {
    let username = this.forgotPasswordForm.value.username;
    this.userService
      .getSingleUserByUsername(username)
      .subscribe((data: any) => {
        if (data.length == 1) {
          if (
            this.forgotPasswordForm.value.currentPassword ==
            this.forgotPasswordForm.value.newPassword
          ) {
            data[0].password = this.forgotPasswordForm.value.newPassword;
            this.obj = data[0];

            this.userService
              .updatePassword(this.obj.id, this.obj)
              .subscribe((data: any) => console.log('data', data));
              this.router.navigate(['login'])
          }
        }
      });
  }
}
