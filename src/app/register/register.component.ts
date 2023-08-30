import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {RegisterService} from "../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerF : FormGroup = new FormGroup<any>({
    username : new FormControl('' , [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)])
  });
  constructor(private registerService : RegisterService) {
  }
  onRegister() : any{
    if(this.registerF.invalid) {
      return;
    }
    this.registerService.register(this.registerF.value).subscribe(function (res : any) {
      if(res.statusCode == "Fail") {
        if(res.msg != "Đã tồn tại tài khoản" && res.msg != "Không trùng khớp") {
          alert("Mật khẩu cần ít nhất 1 chữ in hoa, 1 chữ số! Vui lòng nhập lại");
        }
        else {
          alert(res.msg);
        }
      }
      else {
        let jsonData = JSON.stringify(res.data);
        sessionStorage.setItem('register', jsonData);
        console.log(res);
        location.assign('http://localhost:4200/login');
      }
    })
  }
}
