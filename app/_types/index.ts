import { ReactElement, ReactNode } from "react";

export interface ModalBaseType {
  closeModal: () => void;
}

type BottomSheetRefs = {
  sheet: (node: HTMLElement | null) => void;
  content: (node: HTMLElement | null) => void;
};
export interface BottomSheetBaseType {
  closeBottomSheet: () => void;
  refs: BottomSheetRefs;
}
export interface MapType {
  name: string;
  address: string;
  addressDetail?: string;
}

export type SignupStepNameType = "계정 정보" | "프로필 정보" | "아티스트 선택";

export type PostStepNameType = "행사 대상" | "행사 정보" | "특전 정보" | "상세 설명";

export interface StepType<T> {
  name: T;
  children: ReactNode;
}

export interface FunnelType<T> {
  children: Array<ReactElement<StepType<T>>>;
}

export interface ProfileSetupType<T> {
  steps: SignupStepNameType[];
  handleNextClick: (nextStep: SignupStepNameType) => void;
  Funnel: React.ComponentType<FunnelType<T>>;
  Step: React.ComponentType<StepType<T>>;
}

export interface SignUpFormType {
  email: string;
  password: string;
  passwordCh: string;
  profileImg: string;
  nickName: string;
  myArtists: string[] | [];
}

export interface UserType {
  id: string;
  nickName: string;
  profileImage?: string;
}

export type EventType = "카페" | "나눔" | "팬광고" | "팝업스토어" | "상영회" | "기타";
export type GiftType = "컵홀더" | "포스터" | "스티커" | "티켓" | "포토카드" | "엽서" | "굿즈" | "기타";
export type SnsType = "트위터" | "인스타그램" | "유튜브" | "기타";

// 삭제 예정
export interface EventInfoType {
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
  tags?: GiftType[];
}

// 삭제 예정
export interface ReviewType {
  userId: string;
  eventId: string;
  isPublic?: boolean;
  rating: boolean;
  description: string;
  reviewImages?: string[];
  like: number;
}

// 삭제 예정
export type ArtistType = {
  name: string;
  group?: string[];
  profileImage: string;
};

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

export interface EventReviewType {
  id: string;
  cursorId: number;
  isPublic: boolean;
  rating: boolean;
  description: string;
  createdAt: string;
  likeCount: number;
  isLike: boolean;
  user: UserType;
  reviewImages: { url: string; createdAt: string }[];
}
