import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private userService:UserService, private router:Router){
   
  }
  // ngOnInit(){
  //   let user=this.userService.getLocalStorage('user')
  //   if (!user){
  //     this.router.navigate(['login'])


  //   }
  

}
