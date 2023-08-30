import {UserInfo} from "./user-info";

export interface Notification{
  id?: number;
  dateCreated?: Date;
  content?: string;
  fromUserInfo?: UserInfo;
  toUserInfo?: UserInfo;
  postId?: number
}
