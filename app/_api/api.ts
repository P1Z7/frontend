import { Req_Post_Type } from "@/types/postBodyType";
import { Req_Query_Type } from "@/types/queryType";

const STR_RES_ENDPOINT = ["/file/upload", "/event/update/application"];

export class Api {
  private baseUrl;
  private queryString;
  private accessToken;

  constructor(token?: string) {
    this.baseUrl = "";
    this.queryString = "";
    this.accessToken = token;
  }

  private makeQueryString<T>(queryObj: GetQueryType<T> | PostQueryType<T>) {
    this.queryString = "?";
    if (queryObj) {
      const queryKeyList = Object.keys(queryObj);
      queryKeyList.forEach((query, idx) => {
        this.queryString += `${query}=${queryObj[query as keyof (GetQueryType<T> | PostQueryType<T>)]}`;
        if (idx !== queryKeyList.length - 1) {
          this.queryString += "&";
        }
      });
    }
  }

  async get<T extends GetEndPoint>(endPoint: T, queryObj?: GetQueryType<T>) {
    this.baseUrl = "/api" + endPoint;
    if (queryObj) {
      this.makeQueryString<T>(queryObj);
    }
    const res = await fetch(queryObj ? this.baseUrl + this.queryString : this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }

  async post<T extends PostEndPoint>(endPoint: T, body: PostBodyType<T>, queryObj?: PostQueryType<T>) {
    this.baseUrl = "/api" + endPoint;
    if (queryObj) {
      this.makeQueryString<T>(queryObj);
    }
    const res = await fetch(queryObj ? this.baseUrl + this.queryString : this.baseUrl, {
      method: "POST",
      body: endPoint === "/file/upload" ? (body as any) : JSON.stringify(body),
      headers: {
        ...(endPoint === "/file/upload" || endPoint === "/reviews" ? {} : { "Content-Type": "application/json" }),
        Authorization: `Bearer ${this.accessToken}`,
      },
      credentials: "include",
    });
    return STR_RES_ENDPOINT.includes(endPoint) ? await res.text() : await res.json();
  }

  async put<T extends PutEndPoint>(endPoint: T, body: PutBodyType<T>) {
    this.baseUrl = "/api" + endPoint;
    const res = await fetch(this.baseUrl, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }

  async delete<T extends DeleteEndPoint>(endPoint: T, body: DeleteBodyType<T>) {
    this.baseUrl = "/api" + endPoint;
    const res = await fetch(this.baseUrl, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }
}

type GetEndPoint =
  | "/event"
  | "/event/like"
  | `/event/${string}`
  | "/artist/group"
  | `/artist/${string}`
  | "/group/solo"
  | `/reviews/${string}`
  | "/group"
  | "/artist"
  | "/users/nickname"
  | `/event/update/application/${string}`;
type PostEndPoint =
  | "/event"
  | "/event/like"
  | "/users"
  | "/auth"
  | "/auth/token"
  | "/artist"
  | "/group"
  | "/file/upload"
  | "/reviews"
  | `/reviews/${string}/like`
  | "/email"
  | "/email/verification"
  | "/event/update/application"
  | "/event/update/approval";

type PutEndPoint = `/event/${string}`;
type DeleteEndPoint = `/users/${string}/artists` | `/reviews/${string}/images`;
type PostQueryType<T> = T extends "/file/upload" ? { category: "event" | "artist" | "user" } : unknown;

type PostBodyType<T> = T extends "/event"
  ? Req_Post_Type["event"]
  : T extends "/event/like"
    ? Req_Post_Type["eventLike"]
    : T extends "/users"
      ? Req_Post_Type["signup"]
      : T extends "/auth"
        ? Req_Post_Type["login"]
        : T extends "/auth/token"
          ? Req_Post_Type["token"]
          : T extends "/artist"
            ? Req_Post_Type["artist"]
            : T extends "/group"
              ? Req_Post_Type["group"]
              : T extends "/file/upload"
                ? FormData
                : T extends "/reviews"
                  ? Req_Post_Type["review"]
                  : T extends `/reviews/${string}/like`
                    ? Req_Post_Type["reviewLike"]
                    : T extends `/email`
                      ? Req_Post_Type["email"]
                      : T extends `/email/verification`
                        ? Req_Post_Type["verification"]
                        : T extends "/event/update/application"
                          ? Req_Post_Type["edit"]
                          : T extends "/event/update/approval"
                            ? Req_Post_Type["approve"]
                            : unknown;

type GetQueryType<T> = T extends "/event"
  ? Req_Query_Type["행사목록"]
  : T extends "/event/like"
    ? Req_Query_Type["행사좋아요"]
    : T extends `/event/update/application/${string}`
      ? Req_Query_Type["수정상세"]
      : T extends `/event/${string}`
        ? Req_Query_Type["행사상세"]
        : T extends "/artist/group"
          ? Req_Query_Type["아티스트"]
          : T extends `/artist/${string}`
            ? Req_Query_Type["멤버"]
            : T extends "/group/solo"
              ? Req_Query_Type["그룹솔로"]
              : T extends `/reviews/${string}`
                ? Req_Query_Type["리뷰"]
                : T extends "/group"
                  ? Req_Query_Type["그룹조회"]
                  : T extends "/artist"
                    ? Req_Query_Type["멤버조회"]
                    : unknown;
// 사용하실 때 직접 추가 부탁드립니다!
type PutBodyType<T> = T extends `/event/${string}` ? Req_Post_Type["event"] : any;
type DeleteBodyType<T> = any;
