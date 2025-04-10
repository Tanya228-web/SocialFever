import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  constructor(private dialogRef: MatDialogRef<CommentComponent>){}
  comment = new FormGroup({
    usercomment: new FormControl<string>(''),
  });

  postComment() {
    if (this.comment.valid) {
      const usercomments = this.comment.value;
      console.log(usercomments);
    }
  }
  onClose(): void {
    this.comment.reset();
    this.dialogRef.close();
  }

}
