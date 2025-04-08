import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(private dialogRef: MatDialogRef<PostFormComponent>) {}

  onSubmit(): void {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      this.dialogRef.close(this.postForm.value); 
    }
  }

  onClose(): void {
    this.postForm.reset();
    this.dialogRef.close();
  }

}
