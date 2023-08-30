import {UserInfo} from "./user-info";
import {Image} from "./image";
import {CommentPost} from "./comment";

export interface PostUser {
  id? : number;
  content? : string;
  dateCreated? : Date;
  userInfo : UserInfo;
  totalLike : number;
  commentPostUser? : Array<CommentPost>;
  image? : Array<Image>;
  totalComment : number
}
