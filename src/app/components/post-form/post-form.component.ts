import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';

import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-post-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  // constructor(private dialogRef: MatDialogRef<PostFormComponent>){}

  
  postForm = new FormGroup({
    caption: new FormControl(''),
    imageUrl: new FormControl('')
  });
 

  
  onSubmit() {
    console.log(this.postForm.value)



   
  
}
}
// imageHandler(event: any) {
//   if (event.target.files) {
//     this.images = Array.from(event.target.files);
//     console.log(this.images);
//   }
// }