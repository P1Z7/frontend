import { ArtistAndGroupListType, EditApplicationType, EventCardType, EventReviewType } from ".";

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

type Res_Get_Edit_Application = EditApplicationType[];

export type Res_Get_Type = {
  event: Res_Get_Event;
  eventList: Res_Get_Event_List;
  eventLike: Res_Get_Event_Like;
  eventSearch: Res_Get_Event_Search;
  eventReviews: Res_Get_EventReviews;
  artistGroup: Res_Get_Artist_Group;
  editApplication: Res_Get_Edit_Application;
};
