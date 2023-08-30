import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
const api = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient) { }

  notification(body : any) : any {
    return this.http.post<any>(`${api}/notification`, body);
  }
}
