import {Component, OnInit} from '@angular/core';
import {EditProfileService} from "../services/edit-profile.service";
import {LoginService} from "../services/login.service";
import {ProfileService} from "../services/profile/profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInfo} from "../model/user-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  userInfo : UserInfo = {};
  oldPass: string = '';
  newPass: string = '';
  confirmPassword: string = '';
  constructor(private profileService : ProfileService,
              private loginService : LoginService,
              private router : Router
  ){}


  ngOnInit() {
    this.userInfo = this.loginService.checkLogin();
    console.log(this.userInfo)
  }

  changePassForm : FormGroup = new FormGroup<any>({
    oldPass : new FormControl('', [Validators.required]),
    newPass : new FormControl('', [Validators.required]),
    id : new FormControl('', null)
  });
  changePasswordFormSubmit() {
    this.changePassForm.patchValue({id : this.userInfo.id});
    this.profileService.changePass(this.changePassForm.value).subscribe(function (res : any) {
      if(res.statusCode == "Fail") {
        alert(res.msg);
      }
      else {
        console.log(res);
        alert("Cap nhat thanh cong!")
      }
    })
      // this.router.navigate(['/profile']);
  }
}
