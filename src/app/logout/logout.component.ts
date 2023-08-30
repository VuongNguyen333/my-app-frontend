import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {UserInfo} from "../model/user-info";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  isLogin: any;
  userInfo : UserInfo = {};
  ngOnInit(): void {
    this.isLogin = this.loginService.checkLogin();
    if(!this.isLogin) location.assign("http://localhost:4200/login");
    else {
      this.userInfo = this.isLogin;
      console.log(this.isLogin)
    }
  }

  loginF : FormGroup = new FormGroup<any>({
    username : new FormControl('' , [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  constructor(private loginService : LoginService) {
  }
  onLogin() : any{
    if(this.loginF.invalid) {
      return;
    }
    this.loginService.login(this.loginF.value).subscribe(function (res : any) {
      if(res.statusCode == "Fail") alert(res.msg);
      else {
        let jsonData = JSON.stringify(res.data);
        localStorage.setItem('login', jsonData);
        // console.log(res);
        location.assign('http://localhost:4200');
      }
    })
  }
}

