import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
const api = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  login(body : any) : any {
    return this.http.post<any>(`${api}/fakebook/login`, body);
  }

  register(body : any) : any {
    return this.http.post<any>(`${api}/fakebook/register`, body);
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
