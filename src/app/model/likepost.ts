import {UserInfo} from "./user-info";
import {PostUser} from "./post-user";

export interface LikePost {
  id? : number;
  status? : boolean;
  postUser?: PostUser;
  userInfo?: UserInfo
}
