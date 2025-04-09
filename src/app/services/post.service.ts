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

}
