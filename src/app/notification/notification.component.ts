import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {ProfileService} from "../services/profile/profile.service";
import {UserInfo} from "../model/user-info";
import {Notification} from "../model/notification";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
  userInfoReq : UserInfo[] = [];
  notifications : Notification[] = [];
  userInfo : UserInfo = {};
  constructor(private loginService : LoginService,
              private profileService : ProfileService) {
  }

  ngOnInit(): void {
    this.userInfo = this.loginService.checkLogin();
    this.loadNotifications();
    this.loadRequest();
  }

  loadNotifications(): void {
    this.profileService.notification({ "id": this.userInfo.id }).subscribe((res: any) => {
      this.notifications = res.data;
      console.log(this.notifications);
    });
  }

  loadRequest(): void {
    this.profileService.getAllReq({ "id": this.userInfo.id }).subscribe((res: any) => {
      this.userInfoReq = res.data;
      console.log(this.userInfoReq,22);
    });
  }

  deleteAll() {
    this.profileService.deleteAllNotification({"id" : this.userInfo.id}).subscribe((res : any) => {
      console.log(res);
      location.reload();
    })
  }

  onLogout() {
    localStorage.clear();
    location.assign("http://localhost:4200/logout");
  }

  onNoti() {
    location.assign("http://localhost:4200/notification")
  }
  onReqFr() {
    location.assign("http://localhost:4200/friend_request")
  }

  onHome() {
    location.assign("http://localhost:4200")
  }
}
