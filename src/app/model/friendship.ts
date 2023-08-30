import {UserInfo} from "./user-info";

export interface Friendship{
  id?: number;
  fromUserInfo?: UserInfo;
  toUserInfo?: UserInfo;
  status?: number
}
