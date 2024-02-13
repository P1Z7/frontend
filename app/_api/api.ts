import { Req_Post_Type } from "@/types/postBodyType";
import { Req_Query_Type } from "@/types/queryType";

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
        ...(endPoint === "/file/upload" ? {} : { "Content-Type": "application/json" }),
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return endPoint === "/file/upload" ? await res.text() : await res.json();
  }

  async put<T>(endPoint: string, body: T) {
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

  async delete(endPoint: string) {
    this.baseUrl = "/api" + endPoint;
    const res = await fetch(this.baseUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }
}

type GetEndPoint = "/event" | "/event/like" | `/event/${string}` | "/artist/group" | `/artist/${string}` | "/group/solo" | `/reviews/${string}`;
type PostEndPoint = "/event" | "/event/like" | "/users" | "/auth" | "/auth/token" | "/artist" | "/group" | "/file/upload" | "/reviews" | `/reviews/${string}/like`;

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
                    : unknown;

type GetQueryType<T> = T extends "/event"
  ? Req_Query_Type["행사목록"]
  : T extends "/event/like"
    ? Req_Query_Type["행사좋아요"]
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
              : unknown;
