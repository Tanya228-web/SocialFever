import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  // template: `
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  openMenu = false;
  isLargeScreen = window.innerWidth > 768;

  constructor(public service: UserService, private router: Router) {}

  @HostListener('window:resize')
  onResize() {
    this.isLargeScreen = window.innerWidth > 768;
  }

  ngOnInit() {
    this.onResize();
  }

  closeIfMobile(sidenav: any) {
    if (!this.isLargeScreen) {
      sidenav.close();
    }
  }
  

  logout() {
    this.service.userLogout()
    this.router.navigate(['login']);
    
  }
}
