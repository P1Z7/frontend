import { Req_Delete_Type } from "@/types/deleteBodyType";
import { Req_Post_Type } from "@/types/postBodyType";
import { Req_Put_Type } from "@/types/putBodyType";
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

  private makeError(result: any) {
    if (result.message) {
      throw new Error(result.message);
    }
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
    const result = await res.json();
    this.makeError(result);

    return result;
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
        credentials: "include",
      },
    });
    const result = STR_RES_ENDPOINT.includes(endPoint) ? await res.text() : await res.json();
    this.makeError(result);

    return result;
  }

  async put<T extends PutEndPoint>(endPoint: T, body: PutBodyType<T>) {
    this.baseUrl = "/api" + endPoint;
    const res = await fetch(this.baseUrl, {
      method: endPoint.includes("event") ? "PUT" : "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const result = await res.json();
    this.makeError(result);

    return result;
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
    const result = await res.json();
    this.makeError(result);

    return result;
  }
}

export const instance = new Api();

type GetEndPoint = "/event" | "/event/like" | `/event/${string}` | "/artist/group" | `/artist/${string}` | "/group/solo" | `/reviews/${string}` | "/users/nickname";

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
  | "/event/update/application";

type PutEndPoint = `/event/${string}` | `/users/${string}/profile` | `/users/${string}/password`;
type DeleteEndPoint = `/users/${string}/artists` | `/reviews/${string}/images` | `/users/${string}`;
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
// 사용하실 때 직접 추가 부탁드립니다!
type PutBodyType<T> = T extends `/event/${string}`
  ? Req_Post_Type["event"]
  : T extends `/users/${string}/profile`
    ? Req_Put_Type["profile"]
    : T extends `/users/${string}/password`
      ? Req_Put_Type["password"]
      : any;
type DeleteBodyType<T> = T extends `/users/${string}` ? Req_Delete_Type["user"] : any;
