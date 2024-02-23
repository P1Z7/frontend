type Req_Delete_myArtist = {
  artistIds: string[];
};

export type Req_Delete_Type = {
  user: undefined;
  myArtist: Req_Delete_myArtist;
};
