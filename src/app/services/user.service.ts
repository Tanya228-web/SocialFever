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

  constructor(private http: HttpClient) {
    let user=this.getLocalStorage('user')
    if(user ){
      this.loginStatus.next(true)

    }
  }
  
  userRegister(data: any) {
    

    let url = 'http://localhost:3000/users';
    return this.http.post(url,data);
  }
  userLogin(data: any) {
    console.log("userlogin",data)
    let url = `http://localhost:3000/users?username=${data.username}`;
    return this.http.get<any>(url).pipe(
      tap((res) => {
        if (res.length > 0) {
  
          this.loginStatus.next(true);
        } else {
          
          this.loginStatus.next(false);
        }
      })
    );
  }
  
  
  userLogout() {
    localStorage.removeItem('user')
    this.loginStatus.next(false)

    
  }
  getSingleUser(id:any){
    console.log("id",id)
    let url=`http://localhost:3000/users?id=${id}`
    return this.http.get(url)
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
  updateEdit(id:any,data:any){
    let url=`http://localhost:3000/users/${id}`
    return this.http.put(url,data)


  }
  userFollowerUpdate(id:any,data:any){
    let url=`http://localhost:3000/users/${id}`
    return this.http.put(url,data)
    

  }
  
  
  unfollowpost(id:any,data:any){
   

    let url=`http://localhost:3000/users/${id}`
    return this.http.put(url,data)


  }
  unfollowing(id:any,data:any){
    let url=`http://localhost:3000/users/${id}`
    return this.http.put(url,data)

  }
  userfollowingupdate(id:any,data:any){
    let url=`http://localhost:3000/users/${id}`
    return this.http.put(url,data)

  }
  getAllUsers(){
    let url='http://localhost:3000/users'
    return this.http.get(url)
  }
  getSingleUserByUsername(username:any){
    let url=`http://localhost:3000/users/?username=${username}`
    return this.http.get(url)

  }
  updatePassword(id:string,userData:any){
    let url=`http://localhost:3000/users/${id}`
    return this.http.put(url,userData)

    
  }


}
