import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {UserInfo} from "../model/user-info";
import {User} from "../model/user";
import {ProfileService} from "../services/profile/profile.service";
import {PostUser} from "../model/post-user";
import {Image} from "../model/image";
import {FormControl, FormGroup} from "@angular/forms";
import {Notification} from "../model/notification";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  notifications : Notification[] = [];
  notFriend : UserInfo[] = [];
  isLogin: UserInfo = {};
  userInfo : UserInfo = {};
  user : Object | undefined = {};
  userInfoReq : UserInfo[] = [];
  postUsers : PostUser[] = [];
  images : (Image | undefined)[] = [];
  formObj : FormData = new FormData();
  constructor(private loginService : LoginService,
              private profileService : ProfileService,
              private http : HttpClient) {
  }
  createLikeF : FormGroup = new FormGroup<any>({
    userInfoId : new FormControl('',null),
    postId : new FormControl('',null)
  });
  deletePostF : FormGroup = new FormGroup<any>({
    id : new FormControl('',null)
  });
  ngOnInit(): void {
    this.isLogin = this.loginService.checkLogin();
    if(!this.isLogin) location.assign("http://localhost:4200/login");
    else {
      this.userInfo = this.isLogin;
      this.user = this.userInfo.user;
      console.log(this.isLogin);
      this.profileService.showAllPost(null).subscribe((res: any) => {
        this.postUsers = res.data;
        console.log(this.postUsers, 333)
        this.images = this.getAllImages(this.postUsers)
        console.log(this.images)
      });
      this.profileService.showNotFriend({"id" : this.isLogin.id}).subscribe((res: any) => {
        this.notFriend = res.data;
        console.log(this.notFriend, 4444);
      });
      this.loadRequest();
      this.loadNotification();
    }
  }

  onLogout() {
    localStorage.removeItem('login');
    location.assign("http://localhost:4200/logout");
  }

  onAbout() {
    location.assign("https://localhost:4200/profile")
  }

  onReqFr() {
    location.assign("http://localhost:4200/friend_request")
  }

  onNoti() {
    location.assign("http://localhost:4200/notification")
  }

  onProfile(id: number | undefined) : string{
    if(this.isLogin.id == id) {
      return "http://localhost:4200/profile";
    } else {
      return `http://localhost:4200/user-page/${{id}}`;
    }
  }

  loadNotification() : void{
    this.profileService.notification({ "id": this.userInfo.id }).subscribe((res: any) => {
      this.notifications = res.data;
      console.log(this.userInfoReq,333);
    });
  }

  loadRequest(): void {
    this.profileService.getAllReq({ "id": this.userInfo.id }).subscribe((res: any) => {
      this.userInfoReq = res.data;
      console.log(this.userInfoReq,22);
    });
  }

  getAllImages(postUsers: PostUser[]): (Image | undefined)[] {
    return postUsers.flatMap(postUser => postUser.image);
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

  uploadImage(event : any) {
    const file = event.currentTarget.files[0];
    if (file.size >= 2000000) {
      alert('Vui lòng chọn ảnh có dung lượng nhỏ hơn 2MB');
    } else {
      this.formObj.append('image', file);
      // this.http.post("http://localhost:8080/newPost", formObj).subscribe((res: any) => {
      //   // this.uploadedFileNames.push(res);
      //   console.log(res);
      //   // location.reload();
      //   let jsonData = JSON.stringify(res.data);
      //   localStorage.setItem('login', jsonData);
      //   // console.log(res);
      //   location.reload();
      // });
    }
  }

  newPost(userId : number | undefined, content : string | undefined) {
    // debugger
    // @ts-ignore
    this.formObj.append("userInfoId" , userId);
    if(content == null) {
      this.http.post("http://localhost:8080/newPost" , this.formObj).subscribe((res : any) =>{
        console.log(res.data);
      })
    } else{
      this.formObj.append("content" , content);
      this.http.post("http://localhost:8080/newPost" , this.formObj).subscribe((res : any) =>{
        console.log(res.data);
      })
    }
  }

  deletePost(postId : number | undefined) : any {
    this.profileService.deletePost({"id" : postId}).subscribe((res : any) =>{
      console.log(res);
      location.reload();
    })
  }
}
