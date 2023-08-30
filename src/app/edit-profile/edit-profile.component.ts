import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditProfileService} from "../services/edit-profile.service";
import {LoginService} from "../services/login.service";
import {UserInfo} from "../model/user-info";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  isLogin : any;
  userInfo : UserInfo = {};
  user : Object | undefined = {};

  constructor(private editProfileService : EditProfileService,
              private loginService : LoginService) {}

  ngOnInit(): void {
    this.userInfo = this.loginService.checkLogin();
    if(!this.userInfo) {
      location.assign("http://localhost:4200/login");
    }
    else console.log(this.userInfo)
  }
  checkId() {
    this.isLogin = this.editProfileService.checkLogin();
    this.userInfo = this.isLogin;
    this.user = this.userInfo.user;
    return this.userInfo.id;
  }
  editProfileF : FormGroup = new FormGroup<any>({
    id : new FormControl('', null ),
    email : new FormControl('', [Validators.required]),
    name : new FormControl('' , [Validators.required]),
    age : new FormControl('', [Validators.required]),
    sex : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    avatarUrl : new FormControl('', null ),
    backgroundUrl : new FormControl('', null ),
    user : new FormControl('', null ),
    about : new FormControl('', [Validators.required]),
  });
  onSubmit() : any {
    if(this.editProfileF.invalid) {
      return;
    }
    this.editProfileF.patchValue({id: this.checkId()});
    this.editProfileF.patchValue({avatarUrl: this.userInfo.avatarUrl});
    this.editProfileF.patchValue({backgroundUrl: this.userInfo.backgroundUrl});
    this.editProfileF.patchValue({user: this.user});
    this.editProfileService.editProfile(this.editProfileF.value).subscribe(function (res : any) {
      if(res.statusCode == "Fail") alert(res.msg);
      else {
        console.log(res);
        location.assign('http://localhost:4200/profile');
      }
    })
  }
}
