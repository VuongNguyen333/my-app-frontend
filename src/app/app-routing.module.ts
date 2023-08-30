import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {ViewPostComponent} from "./view-post/view-post.component";
import {NotificationComponent} from "./notification/notification.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {FriendRequestComponent} from "./friend-request/friend-request.component";

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path: 'register' , component: RegisterComponent},
  {
    path: 'login' ,
    component : LoginComponent
  },
  {
    path : 'logout',
    component : LogoutComponent
  },
  {
    path: 'profile',
    component : ProfileComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'view-post/:postId',
    component: ViewPostComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'user_page/:userName',
    component: UserPageComponent
  },
  {
    path: 'fakebook/update',
    component: ChangePasswordComponent
  },
  {
    path : 'friend_request',
    component : FriendRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
