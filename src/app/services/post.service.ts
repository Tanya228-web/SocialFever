import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  getData() {
    let url = 'http://localhost:3000/posts';
    return this.http.get(url);
  }
  createPost(data: any) {
    let url = 'http://localhost:3000/posts';
    return this.http.post(url, data);
  }
  getSinglePost(id:string){
    let url = `http://localhost:3000/posts/${id}`;
    return this.http.get(url)



  }
  updateComments(postId:any,data:any){
    let url=`http://localhost:3000/posts/${postId}`
    return this.http.put(url,data)
    
  }

}
