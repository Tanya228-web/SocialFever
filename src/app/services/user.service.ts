import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginStatus = new BehaviorSubject<boolean>(false);
  isLogin$ = this.loginStatus.asObservable();

  constructor(private http: HttpClient) {}
  userRegister(data: any) {
    const obj = { ...data, role: 'USER' };
    let url = 'https://api.freeapi.app/api/v1/users/register';
    return this.http.post(url, obj);
  }
  userLogin(data: any) {
    let url = 'https://api.freeapi.app/api/v1/users/login';
    return this.http.post(url, data).pipe(
      tap(() => {
        this.loginStatus.next(true);
      })
    );
  }
  userLogout() {
    let url = 'https://api.freeapi.app/api/v1/users/logout';
    return this.http.post(url, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.loginStatus.next(false);
      })
    );
  }
  postData() {
    let url = 'http://localhost:3000/posts';
    return this.http.get(url);
  }
}
