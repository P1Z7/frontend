import { CategoryType } from ".";

type Req_Post_Event = {
  placeName: string;
  eventType: "카페" | "팝업스토어";
  groupId?: string;
  artists: string[];
  startDate: string;
  endDate: string;
  address: string;
  addressDetail: string;
  userId: string;
  eventImages?: string[];
  description?: string;
  eventUrl?: string;
  organizerSns?: string;
  snsType?: "인스타그램" | "트위터" | "유튜브" | "기타";
  tags?: string[];
  isAgreed: boolean;
};

type Req_Post_Event_Like = {
  userId: string;
  eventId: string;
};

type Req_Post_Signup = {
  userName?: string;
  signupMethod?: string;
  email: string;
  password?: string;
  passwordCheck?: string;
  nickName?: string;
  myArtists?: string[];
};

type Req_Post_Login = {
  code?: string;
  email: string;
  signinMethod: string;
  password?: string;
};

type Req_Post_Token = {
  accessToken: string;
  refreshToken: string;
};

type Req_Post_Artist = {
  artistName: string;
  birthday: string;
  artistImage?: string;
  groups?: string[];
};

type Req_Post_Group = {
  groupName: string;
  debutDate: string;
  groupImage?: string;
};

type Req_Post_Review = {
  userId: string;
  eventId: string;
  isPublic: boolean;
  rating: boolean;
  description: string;
  reviewImages: string[];
  isAgree: boolean;
};

type Req_Post_Review_Like = {
  reviewId: string;
  userId: string;
  isLike: boolean;
};

type Req_Post_Email = {
  email: string;
};

type Req_Post_Verification = {
  email: string;
  verificationNumber: number | string;
};

type Req_Post_Edit_Application = {
  eventId: string;
  updateCategory: CategoryType[];
  userId: string;
  placeName?: string;
  eventType?: string;
  groupId?: string;
  artists?: string[];
  startDate?: string;
  endDate?: string;
  address?: string;
  addressDetail?: string;
  eventImages?: string[];
  description?: string;
  eventUrl?: string;
  organizerSns?: string;
  snsType?: string;
  tags?: string[];
  isAgreed: boolean;
  groupName?: string;
  artistNames?: string;
};

export type Req_Post_Type = {
  event: Req_Post_Event;
  eventLike: Req_Post_Event_Like;
  signup: Req_Post_Signup;
  login: Req_Post_Login;
  token: Req_Post_Token;
  artist: Req_Post_Artist;
  group: Req_Post_Group;
  review: Req_Post_Review;
  reviewLike: Req_Post_Review_Like;
  email: Req_Post_Email;
  verification: Req_Post_Verification;
  edit: Req_Post_Edit_Application;
};
