import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
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

