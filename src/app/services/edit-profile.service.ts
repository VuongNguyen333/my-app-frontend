import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
const api = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http : HttpClient) { }

  editProfile(body : any) : any {
    return this.http.post<any>(`${api}/userInfo/updateInfo`, body);
  }
  checkLogin() : any {
    let jsonData = localStorage.getItem('login');
    if(jsonData) {
      return JSON.parse(jsonData);
    } else {
      return false;
    }
  }
}
