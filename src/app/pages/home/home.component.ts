import { FriendListComponent } from './../../components/friend-list/friend-list.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { PostComponent } from '../../components/post/post.component';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    PostComponent,
    FriendListComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postList: any[] = [];

  constructor(
    private postService: PostService,
    private userService:UserService,
    private dialog: MatDialog
  ) {}
  userData:any=[]
  userDetail:any=[]

  ngOnInit(): void {
    this.fetchPosts();
    this.fetchUsers();
    let userId =this.userService.getLocalStorage('user')[0].id
    this.userService.getSingleUser(userId).subscribe((data:any)=>{
      this.userDetail=data

    })

  }
  fetchUsers(){
    this.userService.getAllUsers().subscribe((Data:any)=>{
      this.userData=Data
      
    })

  }

  fetchPosts(): void {
    this.postService.getData().subscribe((data: any) => {
      this.postList = data;
      
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '650px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchPosts();
      }
    });
  }
}
