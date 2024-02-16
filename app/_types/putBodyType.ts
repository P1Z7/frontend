type Req_Put_Password = {
  password: string;
  passwordCheck: string;
};

type Req_Put_Profile = {
  profileImage: File;
  nickName: string;
};

export type Req_Put_Type = {
  profile: Req_Put_Profile;
  password: Req_Put_Password;
};
