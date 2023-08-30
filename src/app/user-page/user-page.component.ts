import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../model/user-info";
import {PostUser} from "../model/post-user";
import {Image} from "../model/image";
import {LoginService} from "../services/login.service";
import {ProfileService} from "../services/profile/profile.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Friendship} from "../model/friendship";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  notifications : Notification[] = [];
  userInfoReq : UserInfo[] = [];
  isFriend : number = 0;
  friendShip1 : Friendship = {};
  friendShip2 : Friendship = {};
  userLogin : UserInfo = {};
  userInfo : UserInfo = {};
  postUsers : PostUser[] = [];
  images : (Image | undefined)[] = [];
  userInfos : (UserInfo | undefined)[] = [];
  userName : String | undefined;
  constructor(private loginService : LoginService,
              private profileService : ProfileService,
              private route: ActivatedRoute) {
  }
  reqAddF : FormGroup = new FormGroup<any>({
    fromUserInfoId : new FormControl('', null),
    toUserInfoId : new FormControl('', null)
  });
  createLikeF : FormGroup = new FormGroup<any>({
    userInfoId : new FormControl('',null),
    postId : new FormControl('',null)
  });
  deleteFriendF : FormGroup = new FormGroup<any>({
    fromUserInfoId : new FormControl('', null),
    toUserInfoId : new FormControl('', null)
  });
  showImages = false;

  toggleImages() {
    this.showImages = !this.showImages;
  }
  ngOnInit(): void {
    this.userLogin = this.loginService.checkLogin();
    console.log(this.userLogin)
    if(!this.userLogin) location.assign("http://localhost:4200/login");
    else {
      // tach
      this.route.paramMap.subscribe(params => {
        this.userName = String(params.get('userName'));
        this.profileService.getUserInfo(this.userName).subscribe((res: any) => {
          this.userInfo = res.data;
          this.statusFr(this.userLogin?.id , this.userInfo?.id);
          // this.friendShip2 = this.statusFr(this.userInfo.id , this.userLogin.id);
          this.profileService.getAll({"id": this.userInfo.id}).subscribe((res: any) => {
            this.postUsers = res.data;
            console.log(res.data);
            this.images = this.getAllImages(this.postUsers) || null;
            console.log(this.images);
            this.profileService.showAllFriend({"id" : this.userInfo.id}).subscribe((res:any) =>{
              this.userInfos = res.data;
              console.log(this.userInfos);
            })
          })
          this.loadRequest();
          this.loadNotification();
        });
      });
    }
  }

  getAllImages(postUsers: PostUser[]): (Image | undefined)[] {
    return postUsers.flatMap(postUser => postUser.image);
  }

  onNoti() {
    location.assign("http://localhost:4200/notification")
  }

  createLike(like : number, userInfoId : number, postId : number) {
    this.createLikeF.patchValue({userInfoId: userInfoId});
    this.createLikeF.patchValue({postId: postId});
    if (this.createLikeF.invalid) {
      return;
    }
    this.profileService.createLike(this.createLikeF.value).subscribe(function (res: any) {
      if (res.statusCode == "Fail") alert(res.msg);
      else {
        console.log(res);
        // location.assign('http://localhost:4200/profile');
      }
    })
  }
  reqAddFr (fromUserInfoId : number | undefined, toUserInfoId : number | undefined) {
    this.reqAddF.patchValue({fromUserInfoId : fromUserInfoId});
    this.reqAddF.patchValue({toUserInfoId : toUserInfoId});
    if (this.reqAddF.invalid) {
      return;
    }
    this.profileService.reqAddFr(this.reqAddF.value).subscribe(function (res: any) {
      if (res.statusCode == "Fail") alert(res.msg);
      else {
        console.log(res);
        location.reload();
        // location.assign('http://localhost:4200/profile');
      }
    })
  }

  // @ts-ignore
  async statusFr(fromUserInfoId: number | undefined, toUserInfoId: number | undefined) : any{
    this.reqAddF.patchValue({fromUserInfoId : fromUserInfoId});
    this.reqAddF.patchValue({toUserInfoId : toUserInfoId});
    let res1 = await this.profileService.getStatusFr(this.reqAddF.value) || null;
    this.reqAddF.patchValue({fromUserInfoId : toUserInfoId});
    this.reqAddF.patchValue({toUserInfoId : fromUserInfoId});
    let res2 = await this.profileService.getStatusFr(this.reqAddF.value) || null;
    if (res1.statusCode == "Fail") alert(res1.msg);
    else {
      this.friendShip1 = res1.data;
      console.log(this.friendShip1,111);
    }
    if (res2.statusCode == "Fail") alert(res2.msg);
    else {
      this.friendShip2 = res2.data;
      console.log(this.friendShip2,11111);
    }
    if (this.friendShip1 && this.friendShip2) {
      if (this.friendShip1.status == 2 && this.friendShip2.status == 2) {
        this.isFriend = 2;
      } else if(this.friendShip1.status == 1 && this.friendShip2.status == 0){
        this.isFriend = 1;
      } else if(this.friendShip1.status == 0 && this.friendShip2.status == 1){
        this.isFriend = -1;
      } else if(this.friendShip1.status == 0 && this.friendShip2.status == 0) {
        this.isFriend = 0;
      }
    }
    console.log(this.isFriend)
  }

  // @ts-ignore
  async acceptFr (fromUserInfoId : number | undefined, toUserInfoId : number | undefined) {
    this.reqAddF.patchValue({fromUserInfoId : fromUserInfoId});
    this.reqAddF.patchValue({toUserInfoId : toUserInfoId});
    let res = await this.profileService.acceptFriend(this.reqAddF.value) || null;
    if(res.statusCode == 'Fail') alert(res.msg);
    location.reload();
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
  onReqFr() {
    location.assign("http://localhost:4200/friend_request")
  }
  deleteFr(userInfoId : number | undefined) {
    if (this.deleteFriendF.invalid) {
      return;
    }
    this.deleteFriendF.patchValue({fromUserInfoId : this.userLogin.id});
    this.deleteFriendF.patchValue({toUserInfoId : userInfoId});
    this.profileService.deleteFriend(this.reqAddF.value).subscribe(function (res: any) {
      if (res.statusCode == "Fail") alert(res.msg);
      else {
        console.log(res);
        location.reload();
      }
    })
  }
  showAvatar() {
    // @ts-ignore
    location.assign(this.userInfo.avatarUrl);
  }
}
