import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../model/user-info";
import {LoginService} from "../services/login.service";
import {ProfileService} from "../services/profile/profile.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Notification} from "../model/notification";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit{
  notifications : Notification[] = [];
  userLogin : UserInfo = {};
  userInfoReq : UserInfo[] = [];
  reqAddF : FormGroup = new FormGroup<any>({
    fromUserInfoId : new FormControl('', null),
    toUserInfoId : new FormControl('', null)
  });
  deleteFriendF : FormGroup = new FormGroup<any>({
    fromUserInfoId : new FormControl('', null),
    toUserInfoId : new FormControl('', null)
  });
  ngOnInit(): void {
    this.userLogin = this.loginService.checkLogin();
    console.log(this.userLogin,11)
    if(!this.userLogin) location.assign("http://localhost:4200/login");
    this.loadRequest();
    this.loadNotification();
  }
  constructor(private loginService : LoginService,
              private profileService : ProfileService,
              private route: ActivatedRoute) {
  }

  loadRequest(): void {
    this.profileService.getAllReq({ "id": this.userLogin.id }).subscribe((res: any) => {
      this.userInfoReq = res.data;
      console.log(this.userInfoReq,22);
    });
  }
  loadNotification() : void{
    this.profileService.notification({ "id": this.userLogin.id }).subscribe((res: any) => {
      this.notifications = res.data;
      console.log(this.userInfoReq,333);
    });
  }

  acceptFr (fromUserInfoId : number | undefined, toUserInfoId : number | undefined) {
    this.reqAddF.patchValue({fromUserInfoId : fromUserInfoId});
    this.reqAddF.patchValue({toUserInfoId : toUserInfoId});
    this.profileService.acceptFriend1(this.reqAddF.value).subscribe(function (res: any) {
      if (res.statusCode == "Fail") alert(res.msg);
      else {
        console.log(res);
        location.reload();
      }
    })
  }

  deleteFriend(fromUserInfoId : number | undefined, toUserInfoId : number | undefined) {
    this.deleteFriendF.patchValue({fromUserInfoId : fromUserInfoId});
    this.deleteFriendF.patchValue({toUserInfoId : toUserInfoId});
    this.profileService.deleteFriend(this.deleteFriendF.value).subscribe(function (res: any) {
      if (res.statusCode == "Fail") alert(res.msg);
      else {
        console.log(res);
        location.reload();
      }
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
}
