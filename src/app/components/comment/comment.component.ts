import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-comment',
  imports: [MatFormField,MatIcon],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

}
