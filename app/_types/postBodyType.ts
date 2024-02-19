import { CategoryType, EditContentType, EventType, SnsType } from ".";

type Req_Post_Event = {
  placeName: string;
  eventType: EventType;
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
  snsType?: SnsType;
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

type Req_Post_Edit_Application = EditContentType & {
  eventId: string;
  updateCategory: CategoryType[];
  userId: string;
  isAgreed: boolean;
};

type Req_Post_Approval = {
  eventUpdateApplicationId: string;
  isApproved: boolean;
  userId: string;
};

type Req_Post_Request = {
  name: string;
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
  approve: Req_Post_Approval;
  request: Req_Post_Request;
};
