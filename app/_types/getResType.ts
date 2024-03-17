import { ArtistAndGroupListType, ArtistGroupMonthType, EditApplicationType, EventCardType, EventReviewType } from ".";

type Res_Get_Event = EventCardType;

type Res_Get_Event_List = EventCardType[];

type Res_Get_Event_Like = {
  status: boolean;
  likeCount: number;
};

type Res_Get_Event_Search = {
  eventList: EventCardType[];
  page: number;
  size: number;
  totalCount: number;
};

type Res_Get_EventReviews = EventReviewType[];

type Res_Get_Artist_Group = ArtistAndGroupListType;
type Res_Get_myArtist = {
  artistId: string;
  artistName: string;
  asrtistImage: string;
};

type Res_Get_Edit_Application = EditApplicationType[];

type Res_Get_Artist_Event = {
  eventList: EventCardType[];
  page: number;
  size: number;
  totalCount: number;
};

type Res_Get_Artist_Group_Month = ArtistGroupMonthType[];

export type Res_Get_Type = {
  event: Res_Get_Event;
  eventList: Res_Get_Event_List;
  eventLike: Res_Get_Event_Like;
  eventSearch: Res_Get_Event_Search;
  eventReviews: Res_Get_EventReviews;
  artistGroup: Res_Get_Artist_Group;
  myArtist: Res_Get_myArtist;
  editApplication: Res_Get_Edit_Application;
  artistEvent: Res_Get_Artist_Event;
  artistMonth: Res_Get_Artist_Group_Month;
};
