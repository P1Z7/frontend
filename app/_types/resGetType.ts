import { EventImagesType, EventTagType } from ".";

interface Res_Get_Event {
  id: string;
  sequence: string;
  placeName: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  eventUrl: string;
  user: string;
  userId: string;
  organizerSns: String;
  snsType: string;
  address: string;
  addressDetail: string;
  isAgreed: boolean;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  likeCount: number;
  eventImages: EventImagesType[];
  // TODO: ArtistType으로 통일
  targetArtists: {
    eventId: string;
    artistId: string;
    artistName: string;
    groupId: string;
    groupName: string;
  }[];
  eventTags: EventTagType[];
}

export type Res_Get_Type = {
  event: Res_Get_Event;
};
