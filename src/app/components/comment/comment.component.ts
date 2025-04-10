import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
@Component({
  selector: 'app-comment',
  imports: [NgFor,MatFormField],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

}
