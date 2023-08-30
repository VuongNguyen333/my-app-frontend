import {PostUser} from "./post-user";

export interface Image {
  id? : number;
  image?: Array<string>;
  postUserId? : number
}
