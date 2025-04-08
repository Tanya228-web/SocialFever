
import { Component } from '@angular/core';
import { PostComponent } from '../../components/post/post.component';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [PostComponent,MatIcon,PostFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private service:UserService,private dialogRef:MatDialog){}
  openDialog(){
    this.dialogRef.open(PostFormComponent)
  }
  postList:any=[];
  ngOnInit(){
    this.service.postData().subscribe((data:any)=>{
      this.postList=data
      console.log(this.postList)
    })
  }
  createPost(){
    


  }



}
