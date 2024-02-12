import { EventCardType, EventReviewType } from ".";

type Res_Get_Event = EventCardType;

type Res_Get_EventReviews = EventReviewType[];

export type Res_Get_Type = {
  event: Res_Get_Event;
  eventReviews: Res_Get_EventReviews;
};
