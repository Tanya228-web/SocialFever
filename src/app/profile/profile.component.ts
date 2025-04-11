import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../services/post.service';
import { UserService } from './../services/user.service';
import { EditComponent } from '../edit/edit.component';

import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {};
  postData: any[] = [];

  constructor(
    private userservice: UserService,
    private postservice: PostService,
    private dialog:MatDialog
  ) {}
  userId:any=""

  ngOnInit(): void {
    this.getSingleUser();
   
  }
 
  fetchPosts(): void {
    this.postservice.getData().subscribe((data: any) => {
      this.postData= data;
      console.log('Fetched Posts:', this.postData);
    });
  }
  getSingleUser(){
    const user = this.userservice.getLocalStorage('user');
    if (user && user.length > 0) {
      this.userId = user[0].id;

      this.userservice.getSingleUser(this.userId).subscribe((data: any) => {
        this.userData = data[0];
        console.log("userDATA",this.userData.id)

        this.postservice.getUserPosts(this.userId).subscribe((posts: any) => {
          this.postData = posts;
          console.log(this.postData)
        });
      });
    }
  }
  
    openDialog(): void {
      const dialogRef = this.dialog.open(EditComponent, {
        data: {
          userId: this.userData.id 
        },
        width: '650px',
        maxWidth: '95vw',
        panelClass: 'custom-dialog-container',
        autoFocus: false
        
      });
      
    
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.getSingleUser();
          console.log("results",result)
        }
      });
    }



 
}
