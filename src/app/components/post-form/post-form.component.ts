import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  postForm = new FormGroup({
    caption: new FormControl<string>(''),
    imageUrl: new FormControl<string>(''),
  });

  constructor(private dialogRef: MatDialogRef<PostFormComponent>, private postService:PostService, private userService: UserService) {}

  onSubmit(): void {
    if (this.postForm.valid) {
      let user = this.userService.getLocalStorage('user')[0];
      let obj = {
        "description": this.postForm.value.caption,
        "photos": [this.postForm.value.imageUrl],
        "userId": user.id,
        "userName": user.name,
    }
      this.postService.createPost(obj).subscribe((data: any) => {
        console.log(data);
        this.dialogRef.close(true); 
      }, (error: any) => {
        console.error('Error creating post:', error);
      });
    }
    else {
      console.log('Form is invalid');
    }
  }

  onClose(): void {
    this.postForm.reset();
    this.dialogRef.close();
  }
}
