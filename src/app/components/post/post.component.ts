import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
@Component({
  selector: 'app-post',
  imports: [MatCardModule,MatIconModule,MatButtonModule,NgFor,NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() postData:any=[]
  nextImage(post: any): void {
    const length = post.photos.length;
    post.currentIndex = (post.currentIndex ?? 0) + 1;
    if (post.currentIndex >= length) {
      post.currentIndex = 0;
    }
  }
  
  prevImage(post: any): void {
    const length = post.photos.length;
    post.currentIndex = (post.currentIndex ?? 0) - 1;
    if (post.currentIndex < 0) {
      post.currentIndex = length - 1;
    }
  }

}
