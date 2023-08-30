import {PostUser} from "./post-user";
import {UserInfo} from "./user-info";

export interface CommentPost {
  id? : number;
  content? : string;
  dateCreated? : Date;
  userInfo? : UserInfo;
  postUser? : PostUser
}
