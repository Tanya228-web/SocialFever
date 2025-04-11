import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { EditComponent } from '../../components/edit/edit.component';

import { MatDialog} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor,NgIf,MatIcon],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {};
  postData: any = [];
  userId:any=""

  constructor(
    private userservice: UserService,
    private postservice: PostService,
    private dialog:MatDialog
  ) {}


  ngOnInit(): void {
    const user = this.userservice.getLocalStorage('user');
    if (user && user.length > 0) {
      this.userId = user[0].id;

      this.userservice.getSingleUser(this.userId).subscribe((data: any) => {
        this.userData = data[0];
        this.postservice.getUserPosts(this.userId).subscribe((posts: any) => {
          this.postData = posts;
        });
      });
    }
   
  }
 
  fetchPosts(): void {
    this.postservice.getData().subscribe((data: any) => {
      this.postData= data;
    });
  }
  getUser(){
    const user = this.userservice.getLocalStorage('user');
    if (user && user.length > 0) {
      this.userId = user[0].id;

      this.userservice.getSingleUser(this.userId).subscribe((data: any) => {
        this.userData = data[0];
      });
    }
    
  }
  
    openEditDialog(): void {
      const dialogRef = this.dialog.open(EditComponent, {
        data: {
          userId: this.userData.id 
        },
        width: '650px',
        maxWidth: '95vw',
        panelClass: 'custom-dialog-container',
        autoFocus: false
        
      });
      
    
  
      dialogRef.afterClosed().subscribe((result:any) => {
          this.getUser();

      });
    }



 
}
