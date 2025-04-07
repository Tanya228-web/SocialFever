import { authGuard } from './guard/auth.guard';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
export const routes: Routes = [
  {
    path: '',
    
    component: HomeComponent,
    canActivate:[authGuard]
    
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
