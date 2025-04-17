import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfile: any = {};
  postData: any[] = [];
  userId: string = '';
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getLocalStorage('user')?.[0];
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') || '';
      if (this.userId) {
        this.loadUserProfile(this.userId);
        this.loadUserPosts(this.userId);
      }
    });
  }

  loadUserProfile(userId: string): void {
    this.userService.getSingleUser(userId).subscribe((res: any) => {
      this.userProfile = res[0];
    });
  }

  loadUserPosts(userId: string): void {
    this.postService.getUserPosts(userId).subscribe((posts: any) => {
      this.postData = posts;
    });
  }

  follow(): void {
    if (!this.currentUser) return;

    this.userService.getSingleUser(this.userId).subscribe((res: any) => {
      const userToFollow = res[0];

      // Avoid duplicate entries
      if (!userToFollow.followers.includes(this.currentUser.id)) {
        userToFollow.followers.push(this.currentUser.id);

        this.userService
          .userFollowerUpdate(this.userId, userToFollow)
          .subscribe(() => {
            this.userService
              .getSingleUser(this.currentUser.id)
              .subscribe((myData: any) => {
                const updatedCurrent = myData[0];
                if (!updatedCurrent.following.includes(this.userId)) {
                  updatedCurrent.following.push(this.userId);
                  this.userService
                    .userfollowingupdate(this.currentUser.id, updatedCurrent)
                    .subscribe(() => {
                      console.log('Followed successfully');
                      this.loadUserProfile(this.userId); // refresh view
                    });
                }
              });
          });
      }
    });
  }

  unfollow(): void {
    if (!this.currentUser) return;

    this.userService.getSingleUser(this.userId).subscribe((res: any) => {
      const targetUser = res[0];
      targetUser.followers = targetUser.followers.filter(
        (id: any) => id !== this.currentUser.id
      );

      this.userService.unfollowpost(this.userId, targetUser).subscribe(() => {
        this.userService
          .getSingleUser(this.currentUser.id)
          .subscribe((myData: any) => {
            const current = myData[0];
            current.following = current.following.filter(
              (id: any) => id !== this.userId
            );

            this.userService
              .unfollowing(this.currentUser.id, current)
              .subscribe(() => {
                console.log('Unfollowed successfully');
                this.loadUserProfile(this.userId);
              });
          });
      });
    });
  }
}
