import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getAll(body : any) : any {
    return this.http.post<any>(`${API_URL}/Home`, body);
  }

  showAllFriend(body : any) :any {
    return this.http.post<any>(`${API_URL}/friendship/listFriend`, body);
  }

  createLike(body : any):any {
    return this.http.post<any>(`${API_URL}/like_post/create_like`, body);
  }

  notification(body : any) : any {
    return this.http.post<any>(`${API_URL}/notification`, body);
  }

  viewPost(postId : number) : Observable<any> {
    return this.http.get<any>(`${API_URL}/view-post/${postId}`);
  }

  getUserInfo(userName : String) : Observable<any> {
    return this.http.get<any>(`${API_URL}/userInfo/user/${userName}`);
  }

  reqAddFr(body : any) : any {
    return this.http.post<any>(`${API_URL}/friendship/addFriend`, body);
  }

  getStatusFr(body : any) : Promise<any> {
    return this.http.post<any>(`${API_URL}/friendship/getStatus`, body).toPromise();
  }

  acceptFriend(body : any) : Promise<any> {
    return this.http.post<any>(`${API_URL}/friendship/newFriend`, body).toPromise();
  }

  getStatusLike(body : any) : any{
    return this.http.post<any>(`${API_URL}/like_post/getStatus`, body);
  }

  deleteFriend(body : any) : any{
    return this.http.post<any>(`${API_URL}/friendship/deleteFriend`, body);
  }

  changePass(body : any) : any{
    return this.http.post<any>(`${API_URL}/fakebook/update`, body);
  }

  getAllReq(body : any) : any{
    return this.http.post<any>(`${API_URL}/friendship/request`, body);
  }

  acceptFriend1(body : any) : any {
    return this.http.post<any>(`${API_URL}/friendship/newFriend`, body);
  }

  deleteAllNotification(body : any) : any {
    return this.http.post<any>(`${API_URL}/notification/deleteAll`, body);
  }

  showAllPost(body : null) : any {
    return this.http.post<any>(`${API_URL}/showAll`, body);
  }

  showNotFriend(body : any) : any {
    return this.http.post<any>(`${API_URL}/friendship/showNotFriend`, body);
  }

  deletePost(body : any) : any {
    return this.http.post<any>(`${API_URL}/deletePost`, body);
  }
 //
  // setUp() {
  //   let jsonData = localStorage.getItem('post');
  //   if(jsonData) {
  //     return JSON.parse(jsonData);
  //   } else {
  //     return false;
  //   }
  // }
}
