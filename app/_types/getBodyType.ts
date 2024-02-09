import { EventType, GiftType, SnsType } from ".";

type ArtistAndGroupType = {
  id: string;
  name: string;
  image: string;
  type: "solo" | "member" | "group";
};

export interface ArtistAndGroupListType {
  page: number;
  size: number;
  artistAndGroupList: ArtistAndGroupType[];
}

export interface EventImageType {
  id: string;
  eventId: string;
  imageUrl: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface TargetArtistType {
  eventId: string;
  artistId: string;
  artistName: string;
  groupId: string;
  groupName: string;
}

export interface EventTagType {
  eventId: string;
  tagId: string;
  tagName: GiftType;
}

export interface EventCardType {
  id: string;
  sequence: string;
  placeName: string;
  description: string;
  eventType: EventType;
  startDate: string;
  endDate: string;
  eventUrl: string;
  user: string;
  userId: string;
  organizerSns: string;
  snsType: SnsType;
  address: string;
  addressDetail: string;
  isAgreed: boolean;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
  likeCount: number;
  eventImages: EventImageType[];
  targetArtists: TargetArtistType[];
  eventTags: EventTagType[];
}
