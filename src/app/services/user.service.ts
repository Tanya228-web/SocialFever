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
    const obj = { ...data, name: '', avatar: '', bio: '', location: '' };

    let url = 'http://localhost:3000/users';
    return this.http.post(url, obj);
  }
  userLogin(data: any) {
    let url = `http://localhost:3000/users?username=${data.username}`;
    return this.http.get(url);
  }
  userLogout() {
    let url = 'https://api.freeapi.app/api/v1/users/logout';
    return this.http.post(url, {})
  }
  setLocalStorage(key: any, data: any) {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  getLocalStorage(key: any) {
    
    let jsondata = localStorage.getItem(key);
    
    return jsondata && JSON.parse(jsondata);
  }
  updateLikes(postId:any,data:any){
    let url=`http://localhost:3000/posts/${postId}`
    return this.http.put(url,data)
    
  }

}
