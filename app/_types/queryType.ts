type Req_Query_Event = {
  keyword?: string;
  sido?: string;
  gungu?: string;
  startDate?: string;
  endDate?: string;
  tags?: string;
  sort?: "최신순" | "인기순";
  page?: number;
  size?: number;
};

type Req_Query_Event_Detail = {
  eventId: string;
};

type Req_Query_Event_Like = {
  userId: string;
  eventId: string;
};

type Req_Query_Artist_And_Group = {
  keyword?: string;
  page?: number;
  size?: number;
};

type Req_Query_Member = {
  id: string;
};

type Req_Query_Group_And_Solo = {
  size?: number;
  page?: number;
  keyword?: string;
};

type Req_Query_Review = {
  size: number;
  cursorId: number;
};

export type Req_Query_Type = {
  행사목록: Req_Query_Event;
  행사상세: Req_Query_Event_Detail;
  행사좋아요: Req_Query_Event_Like;
  아티스트: Req_Query_Artist_And_Group;
  멤버: Req_Query_Member;
  그룹솔로: Req_Query_Group_And_Solo;
  리뷰: Req_Query_Review;
};
