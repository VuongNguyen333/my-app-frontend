import {User} from "./user";

export interface UserInfo {
  id? : number;
  email? : string;
  age? : string;
  name? : string;
  sex? : string;
  address? : string;
  avatarUrl? : string;
  backgroundUrl? : string;
  about? : string;
  user? : User
}
