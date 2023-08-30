import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {UserInfo} from "../model/user-info";
import {PostUser} from "../model/post-user";
import {ProfileService} from "../services/profile/profile.service";
import {Image} from "../model/image";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Notification} from "../model/notification";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  notifications : Notification[] = [];
  userInfoReq : UserInfo[] = [];
  userInfo : UserInfo = {};
  postUsers : PostUser[] = [];
  images : (Image | undefined)[] = [];
  userInfos : (UserInfo | undefined)[] = [];
  likeCount : number = 0;
  isDisable : boolean = true;
  uploadedFileNames: string[] = [];
  constructor(private loginService : LoginService,
              private profileService : ProfileService,
              private http : HttpClient) {
  }
  createLikeF : FormGroup = new FormGroup<any>({
    userInfoId : new FormControl('',null),
    postId : new FormControl('',null)
  });


  ngOnInit(): void {
    this.userInfo = this.loginService.checkLogin();
    if(!this.userInfo) {
      location.assign("http://localhost:4200/login");
    }
    else {
      console.log(this.userInfo);
      this.profileService.getAll({"id" : this.userInfo.id}).subscribe((res : any) => {
        this.postUsers = res.data;
        console.log(this.postUsers);
        this.images = this.getAllImages(this.postUsers)
        console.log(this.images)
      })
      this.profileService.showAllFriend({"id" : this.userInfo.id}).subscribe((res:any) =>{
        this.userInfos = res.data;
        console.log(this.userInfos);
      })
      this.loadRequest();
      this.loadNotification();
    }
  }

  createLike(like : number, userInfoId : number, postId : number) {
    this.createLikeF.patchValue({userInfoId: userInfoId});
    this.createLikeF.patchValue({postId: postId});
    if(this.createLikeF.invalid) {
      return;
    }
    this.profileService.createLike(this.createLikeF.value).subscribe(function (res : any) {
      if(res.statusCode == "Fail") alert(res.msg);
      else {
        console.log(res);
      }
    })
  }

  getAllImages(postUsers: PostUser[]): (Image | undefined)[] {
    return postUsers.flatMap(postUser => postUser.image);
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

  loadRequest(): void {
    this.profileService.getAllReq({ "id": this.userInfo.id }).subscribe((res: any) => {
      this.userInfoReq = res.data;
      console.log(this.userInfoReq,22);
    });
  }

  loadNotification() : void{
    this.profileService.notification({ "id": this.userInfo.id }).subscribe((res: any) => {
      this.notifications = res.data;
      console.log(this.userInfoReq,333);
    });
  }

  uploadImage(event : any, userId : number | undefined) {
    const file = event.currentTarget.files[0];
    if( file.size < 2000000) {
      const formObj = new FormData();
      formObj.append('avatar', file);
      this.http.post(`http://localhost:8080/userInfo/setAvatar/${userId}`, formObj).subscribe((res : any)=> {
        // this.uploadedFileNames.push(res);
        console.log(res);
        // location.reload();
        let jsonData = JSON.stringify(res.data);
        localStorage.setItem('login', jsonData);
        // console.log(res);
        location.reload();
      });
    } else {
        alert('Vui lòng chọn ảnh có dung lượng nhỏ hơn 2MB');
    }
  }

  uploadImage1(event : any, userId : number | undefined) {
    const file = event.currentTarget.files[0];
    if( file.size < 2000000) {
      const formObj = new FormData();
      formObj.append('avatar', file);
      this.http.post(`http://localhost:8080/userInfo/setBackground/${userId}`, formObj).subscribe((res : any)=> {
        // this.uploadedFileNames.push(res);
        console.log(res);
        // location.reload();
        let jsonData = JSON.stringify(res.data);
        localStorage.setItem('login', jsonData);
        // console.log(res);
        location.reload();
      });
    } else {
      alert('Vui lòng chọn ảnh có dung lượng nhỏ hơn 2MB');
    }
  }

  showAvatar() {
    // @ts-ignore
    location.assign(this.userInfo.avatarUrl);
  }



}
