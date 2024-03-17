type Req_Put_Password = {
  password: string;
  passwordCheck: string;
};

type Req_Put_Profile = {
  profileImage: File;
  nickName: string;
};

type Req_Put_Artists = {
  deleteArtistIds: string[];
  deleteGroupIds: string[];
  addArtistIds: string[];
  addGroupIds: string[];
};

type Req_Put_Reset_Pw = {
  email: string;
  password: string;
  verificationNumber: string | number;
};

export type Req_Put_Type = {
  profile: Req_Put_Profile;
  password: Req_Put_Password;
  artists: Req_Put_Artists;
  resetPw: Req_Put_Reset_Pw;
};
