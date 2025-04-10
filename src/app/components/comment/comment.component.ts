import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  postData: any = {};

  constructor(
    private service: PostService,
    private userservice: UserService,
    private dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postId: any }
  ) {
    console.log(this.data.postId);
  }
  comment = new FormGroup({
    usercomment: new FormControl<string>(''),
  });
  ngOnInit() {
    this.service.getSinglePost(this.data.postId).subscribe((data: any) => {
      this.postData = data;
      console.log(this.postData.comments);
    });
  }

  postComment() {
    if (this.comment.valid) {
      const usercomments = this.comment.value.usercomment;

      let userId = this.userservice.getLocalStorage('user')[0].id;

      let obj: any = {
        userId,
        text: usercomments,
      };
      this.postData.comments.push(obj);

      this.service
        .updateComments(this.data.postId, this.postData)
        .subscribe((data: any) => {
          this.comment.reset();
        });
    }
  }
  onClose(): void {
    this.comment.reset();
    this.dialogRef.close();
  }
  deleteComment(userid:string){
    let arr=this.postData.comments.filter((data:any)=>userid!=data.userId)
    this.postData.comments=arr;
    console.log(this.postData)
    this.service.updateComments(this.data.postId,this.postData).subscribe((data:any)=>console.log(data))

    
    


  }
}
