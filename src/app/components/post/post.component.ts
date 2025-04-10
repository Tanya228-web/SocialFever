import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-post',
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgFor, NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  constructor(private service: UserService) {}
  userId: string = '';
  ngOnInit() {
    let userdata = this.service.getLocalStorage('user');
    this.userId = userdata[0].id;
    
  }
  @Input() postData: any = [];
  particularPost: any = [];
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
  like(id: any) {
    let arr = this.postData.filter((data: any) => data.id === id);
    console.log(arr);

    arr[0].likes.push(this.userId);

    this.service
      .updateLikes(id, arr[0])
      .subscribe((data: any) => console.log(data));
  }
  unlike(id: any) {
    let arr = this.postData.filter((data: any) => data.id === id);

    let arr2 = arr[0].likes.filter((data: any) => this.userId != data);

    arr[0].likes = arr2;
    console.log(arr[0]);
    this.service
      .updateLikes(id, arr[0])
      .subscribe((data: any) => console.log(data));
  }
}
