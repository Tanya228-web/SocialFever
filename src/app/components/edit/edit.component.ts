import { Component, OnInit, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  editForm = new FormGroup({
    name: new FormControl<string>(''),
    username: new FormControl<string>(''),
    bio: new FormControl<string>(''),
    avatar: new FormControl<string>(''),
    location: new FormControl<string>(''),
  });

  constructor(
    private userservice: UserService,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: any }
  ) {}

  ngOnInit(): void {
    this.userservice
      .getSingleUser(this.data.userId)
      .subscribe((result: any) => {
        const user = result[0];
        if (user) {
          this.editForm.patchValue({
            name: user.name,
            username: user.username,
            bio: user.bio,
            avatar: user.avatar,
            location: user.location,
          });
        }
      });
  }

  edit() {
    if (this.editForm.valid) {
      this.userservice
        .updateEdit(this.data.userId, this.editForm.value)
        .subscribe((data: any) => {
          console.log('editdata', data);
          this.close()
        });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
