import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../model/user-info";
import {LoginService} from "../services/login.service";
import {PostUser} from "../model/post-user";
import {Image} from "../model/image";
import {ProfileService} from "../services/profile/profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ViewPostService} from "../services/view-post.service";
import {ActivatedRoute} from "@angular/router";
import {CommentPost} from "../model/comment";
import {LikePost} from "../model/likepost";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit{
  content : string = "";
  statusLike : number = 0;
  likePost : LikePost = {};
  totalLike : number = 0;
  userLogin : UserInfo = {};
  userInfo : UserInfo = {};
  // @ts-ignore
  postUser : PostUser;
  postId: number | undefined;
  constructor(private loginService : LoginService,
              private profileService : ProfileService,
              private viewPostService : ViewPostService,
              private route: ActivatedRoute) {
  }
  createLikeF : FormGroup = new FormGroup<any>({
    userInfoId : new FormControl('',null),
    postId : new FormControl('',null)
  });
  getStatusLikeF : FormGroup = new FormGroup<any>({
    userInfoId : new FormControl('', null),
    postId : new FormControl('', null)
  });
  createCmtF : FormGroup = new FormGroup<any>({
    content : new FormControl('', null),
    userInfoId : new FormControl('',null),
    postId : new FormControl('',null)
  });
  ngOnInit(): void {
    this.userLogin = this.loginService.checkLogin();
    if(!this.userLogin) {
      location.assign("http://localhost:4200/login");
    }
    else {
      console.log(this.userLogin);
    }
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('postId'));
      this.viewPostService.viewPost(this.postId).subscribe((res : any) => {
        this.postUser = res.data;
        console.log(this.postUser)
        this.totalLike = this.postUser.totalLike;
        this.userInfo = this.postUser.userInfo;
        console.log(this.userInfo);
        this.profileService.getStatusLike({"userInfoId" : this.userLogin.id, "postId" : this.postId}).subscribe((res : any) => {
          this.likePost = res.data;
          if(this.likePost.status) this.statusLike = 1;
          else this.statusLike = 0;
          console.log(this.likePost);
        });
      });
    });
  }

  createLike(curLike : number, userInfoId : number, postId : number, status : number) {
    if(status) {
      this.totalLike = curLike;
      this.statusLike = 0;
    }
    else {
      this.totalLike = curLike + 1;
      this.statusLike = 1;
    }
    if(this.createLikeF.invalid) {
      return;
    }
    this.createLikeF.patchValue({userInfoId: userInfoId});
    this.createLikeF.patchValue({postId: postId});
    this.profileService.createLike(this.createLikeF.value).subscribe(function (res : any) {
    if(res.statusCode == "Fail") alert(res.msg);
    else {
      console.log(res);
      // location.assign('http://localhost:4200/profile');
    }
    })
    console.log(this.postUser)
  }

  profilePage(cmt : CommentPost) {
    let userName = cmt.userInfo?.user?.username;
    if(this.userLogin.user?.username == userName) {
      location.assign("http://localhost:4200/profile");
    } else {
      location.assign(`http://localhost:4200/user_page/${userName}`)
    }
  }

  onNoti() {
    location.assign("http://localhost:4200/notification")
  }
  createComment(content :string , postId : number | undefined) {
    if(this.createCmtF.invalid) {
      return;
    }
    this.createCmtF.patchValue({content : content});
    this.createCmtF.patchValue({userInfoId : this.userLogin.id});
    this.createCmtF.patchValue({postId : postId});
    this.viewPostService.createCmt(this.createCmtF.value).subscribe(function (res : any) {
      if(res.statusCode == "Fail") alert(res.msg);
      else {
        console.log(res.data)
        location.reload();
      }
    })
  }
}
