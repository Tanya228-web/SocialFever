import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-friend-list',
  imports: [RouterLink],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.css',
})
export class FriendListComponent {
  @Input() userList: any = {};
  @Input() userDetail: any = {};
  constructor(private userService: UserService) {}

  follow(userId: string) {
    this.userService.getSingleUser(userId).subscribe((data: any) => {
      let userData = data[0];

      if (
        userData.followers &&
        !userData.followers.includes(this.userDetail.id)
      ) {
        userData.followers.push(this.userDetail.id);

        this.userService
          .userFollowerUpdate(userId, userData)
          .subscribe((data: any) => {
            console.log('followersUpdate', data);
            if (
              this.userDetail.following &&
              !this.userDetail.following.includes(userId)
            ) {
              this.userDetail.following.push(userId);
              this.userService
                .userfollowingupdate(this.userDetail.id, this.userDetail)
                .subscribe((data: any) => console.log('userfollowing', data));
            }
          });
      }
    });
  }
   


  unFollow(userId:string){
    this.userService.getSingleUser(userId).subscribe((data: any) => {
      let userData = data[0];

      if (
        userData.followers &&
        userData.followers.includes(this.userDetail.id)
      ) {
        let newFollowers=userData.followers.filter((data:any)=>data!=this.userDetail.id)
        console.log("data",newFollowers)
        let obj=  {
          "id": userData.id,
          "name": userData.name,
          "username": userData.username,
          "email": userData.email,
          "avatar": userData.avatar,
          "bio": userData.bio,
          "location": userData.location,
          "password": userData.password,
          "followers": newFollowers,
          "following": userData.following
        }
        //userData.followers=newFollowers
        //userData.followers=[...userData.followers,userData]




        this.userService
        .userFollowerUpdate(userId,obj)
        .subscribe((data: any) => {
        console.log('removeMyId', data);
            if (
              this.userDetail.following &&
              this.userDetail.following.includes(userId)
            ) {
              let newFollowing=this.userDetail.following.filter((data:any)=>data!=userId)
              this.userDetail.following=newFollowing
              this.userService
                .userfollowingupdate(this.userDetail.id,this.userDetail)
                .subscribe((data: any) => console.log('userUnfollowing', data));
            }
          });
      }
    });
  }
   

    


  }

