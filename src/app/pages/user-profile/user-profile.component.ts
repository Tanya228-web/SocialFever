import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [NgFor,NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  constructor(private router:ActivatedRoute,private service:UserService,private services:PostService){}
  postData:any=[]
  userProfile:any={};
  userId:any=""
  ngOnInit(){
    this.router.paramMap.subscribe((data:any)=>{
      this.userId=data.params.id
      console.log(this.userId)
      this.service.getSingleUser(this.userId).subscribe((data:any)=>{
        this.userProfile=data[0];
        console.log(this.userProfile)
        this.services.getUserPosts(this.userId).subscribe((posts: any) => {
          this.postData = posts;
          console.log("data post",this.postData)
        });


      })
    })


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

     
    });
  }

}
