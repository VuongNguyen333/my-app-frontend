import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const API_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class ViewPostService {

  constructor(private http : HttpClient) { }

  viewPost(postId : number) : Observable<any> {
    return this.http.get<any>(`${API_URL}/view-post/${postId}`);
  }

  createCmt(body : any) : any{
    return this.http.post<any>(`${API_URL}/comment/new_comment`, body);
  }
}
