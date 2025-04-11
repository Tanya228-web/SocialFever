import { authGuard } from './guard/auth.guard';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { ProfileComponent } from './profile/profile.component';
export const routes: Routes = [
  {
    path: '',
    
    component: HomeComponent,
    // canActivate:[authGuard]
    
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
  path:'comment',
  component:CommentComponent,
  },
  {
  path:'profile',
  component:ProfileComponent,
  }
];
