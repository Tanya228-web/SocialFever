import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { PostService } from '../services/post.service';
import { UserService } from './../services/user.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {};
  postData: any[] = [];

  constructor(
    private userservice: UserService,
    private postservice: PostService
  ) {}

  ngOnInit(): void {
    const user = this.userservice.getLocalStorage('user');
    if (user && user.length > 0) {
      const userId = user[0].id;

      this.userservice.getSingleUser(userId).subscribe((data: any) => {
        this.userData = data[0];

        this.postservice.getUserPosts(userId).subscribe((posts: any) => {
          this.postData = posts;
          console.log(this.postData)
        });
      });
    }
  }

 
}
