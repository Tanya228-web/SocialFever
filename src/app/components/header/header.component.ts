import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  openMenu = false;
  


  

  constructor(public service: UserService, private router: Router) {}
  
  // ngOnInit(){
  //   this.service.isLogin$.subscribe((data:any)=>{
  //     this.isLogin$=data
  //     console.log(this.isLogin$)
  //   })

  // }

  isMenu() {
    this.openMenu = !this.openMenu;
  }

  logout() {
    this.service.userLogout().subscribe((data:any) => {
      console.log(data)
      this.router.navigate(['login']);
    });
  }
}
