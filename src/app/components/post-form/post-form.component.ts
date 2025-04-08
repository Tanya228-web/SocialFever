import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

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
  images: any = [];
  postForm = new FormGroup({
    caption: new FormControl(''),
  });

  imageHandler(event: any) {
    if (event.target.files) {
      this.images = Array.from(event.target.files);
      console.log(this.images);
    }
  }
  onSubmit() {
    const caption = this.postForm.value.caption;
     // <== this should not be undefined
  
    const formData = new FormData();
    formData.append('caption', caption || '');
  
    this.images.forEach((image: File) => {
      formData.append('images', image);
    });
  
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
  }
  
}
