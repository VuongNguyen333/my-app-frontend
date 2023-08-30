import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
const api = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  register(body : any) : any {
    return this.http.post<any>(`${api}/fakebook/register`, body);
  }
}
