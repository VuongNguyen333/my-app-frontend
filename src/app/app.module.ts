import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { NotificationComponent } from './notification/notification.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LogoutComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    ViewPostComponent,
    NotificationComponent,
    UserPageComponent,
    ChangePasswordComponent,
    FriendRequestComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
