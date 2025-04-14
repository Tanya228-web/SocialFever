import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommentComponent } from '../comment/comment.component';
@Component({
  selector: 'app-post',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgFor,
    NgIf,
    MatDialogModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  constructor(private service: UserService, private dialog: MatDialog) {}
  userId: string = '';

  @Input() postData: any = [];
  particularPost: any = [];
  nextImage(post: any): void {
    const length = post.photos.length;
    post.currentIndex = (post.currentIndex ?? 0) + 1;
    if (post.currentIndex >= length) {
      post.currentIndex = 0;
    }
  }
  ngOnInit() {
    let userdata = this.service.getLocalStorage('user');
    this.userId = userdata[0].id;
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

    arr[0].likes.push(this.userId);

    this.service
      .updateLikes(id, arr[0])
      .subscribe((data: any) => console.log(data));
  }
  unlike(id: any) {
    let arr = this.postData.filter((data: any) => data.id === id);

    let arr2 = arr[0].likes.filter((data: any) => this.userId != data);

    arr[0].likes = arr2;

    this.service
      .updateLikes(id, arr[0])
      .subscribe((data: any) => console.log(data));
  }
  openDialog(postId: any): void {
    const dialogRef = this.dialog.open(CommentComponent, {
      data: { postId },
      width: '650px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }
  follow(id: any) {
    console.log('followersId', id);
    console.log('currentuserId', this.userId);
    let followeruser: any = [];
    this.service.getSingleUser(id).subscribe((data: any) => {
      followeruser = data;

      followeruser[0].followers.push(this.userId);

      this.service
        .userFollowerUpdate(id, followeruser[0])
        .subscribe((data: any) => {
          console.log('followersupdate', data);
          this.service.getSingleUser(this.userId).subscribe((data: any) => {
            let curruserdata = data;
            console.log('curruserdata', curruserdata);

            curruserdata[0].following.push(id);

            this.service
              .userfollowingupdate(this.userId, curruserdata[0])
              .subscribe((data: any) => console.log('followingupdate', data));
          });
        });
    });
  }
  unfollow(followerId: any) {
    console.log('id2', this.userId);
    console.log('id1', followerId);
    this.service.getSingleUser(followerId).subscribe((followerdata: any) => {
      let updatedData = followerdata;
      console.log('updateddata', updatedData);
      let curruser = updatedData[0].followers.filter(
        (data: any) => data != this.userId
      );
      console.log('updatedfollowlist', curruser);
      let obj = {
        id: updatedData[0].id,

        name: updatedData[0].name,
        username: updatedData[0].username,
        email: updatedData[0].email,
        avatar: updatedData[0].avatar,
        bio: updatedData[0].bio,
        location: updatedData[0].location,
        password: updatedData[0].password,
        followers: curruser,
        following: updatedData[0].following,
      };
      console.log('obj', obj);

      this.service.unfollowpost(followerId, obj).subscribe((data: any) => {
        let newunFollower = data;
        console.log('newUnFollower', newunFollower);
        this.service.getSingleUser(this.userId).subscribe((data: any) => {
          let followingUpdate = data;
          let newfollowing = followingUpdate[0].following.filter(
            (data: any) => data != followerId
          );
          console.log('neewfoolowing', newfollowing);
          let obj2 = {
            id: followingUpdate[0].id,

            name: followingUpdate[0].name,
            username: followingUpdate[0].username,
            email: followingUpdate[0].email,
            avatar: followingUpdate[0].avatar,
            bio: followingUpdate[0].bio,
            location: followingUpdate[0].location,
            password: followingUpdate[0].password,
            followers: followingUpdate[0].followers,
            following: newfollowing,
          };
          this.service.unfollowing(this.userId, obj2).subscribe((data: any) => {
            let newunfollowing = data;
            console.log('newunfollowing', newunfollowing);
          });
        });
      });

      //apni id remove krni dusre ke followers se
    });
  }
}
