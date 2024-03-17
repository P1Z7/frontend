type Req_Delete_myArtist = {
  artistIds: string[];
};

type Req_Delete_Event = {
  eventId: string;
  userId: string;
};

export type Req_Delete_Type = {
  user: undefined;
  myArtist: Req_Delete_myArtist;
  event: Req_Delete_Event;
};
