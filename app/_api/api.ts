import { getSession } from "@/store/session/cookies";
import { Req_Delete_Type } from "@/types/deleteBodyType";
import { Req_Post_Type } from "@/types/postBodyType";
import { Req_Put_Type } from "@/types/putBodyType";
import { Req_Query_Type } from "@/types/queryType";

const STR_RES_ENDPOINT = ["/file/upload", "/artist/request", "/reviews", "/event/claim"];

export class Api {
  private baseUrl;
  private queryString;

  constructor() {
    this.baseUrl = "";
    this.queryString = "";
  }

  private async updateToken(res: any) {
    if (res.status === 401) {
      const session = getSession();
      const userId = session?.user.userId;
      const tokenRes = await fetch("/api/auth/token", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (tokenRes.ok) {
        return true;
      }
      throw new Error("토큰 갱신 과정에서 서버 문제가 있습니다.");
    }
    return false;
  }

  private async refetch(endPoint: string, config?: any) {
    const updateRes = await fetch(endPoint, config);
    const updateResult = STR_RES_ENDPOINT.includes(endPoint) || endPoint.split("/").includes("claims") ? await updateRes.text() : await updateRes.json();
    this.makeError(updateResult);
    return updateResult;
  }

  private makeError(result: any) {
    if (result.message) {
      throw new Error(result.error + "/" + result.message);
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
    const newEndPoint = queryObj ? this.baseUrl + this.queryString : this.baseUrl;
    const res = await fetch(newEndPoint);

    if (await this.updateToken(res)) {
      const refetchResult = await this.refetch(newEndPoint);
      return refetchResult;
    }

    const result = await res.json();
    this.makeError(result);
    return result;
  }

  async post<T extends PostEndPoint>(endPoint: T, body: PostBodyType<T>, queryObj?: PostQueryType<T>) {
    this.baseUrl = "/api" + endPoint;
    if (queryObj) {
      this.makeQueryString<T>(queryObj);
    }

    const newEndPoint = queryObj ? this.baseUrl + this.queryString : this.baseUrl;
    const config = {
      method: "POST",
      body: endPoint === "/file/upload" ? (body as any) : JSON.stringify(body),
      headers: {
        ...(endPoint === "/file/upload" ? {} : { "Content-Type": "application/json" }),
      },
    };
    const res = await fetch(newEndPoint, config);

    if (await this.updateToken(res)) {
      const refetchResult = await this.refetch(newEndPoint, config);
      return refetchResult;
    }

    const result = STR_RES_ENDPOINT.includes(endPoint) || endPoint.split("/").includes("claims") ? await res.text() : await res.json();
    this.makeError(result);
    return result;
  }

  async put<T extends PutEndPoint>(endPoint: T, body: PutBodyType<T>) {
    this.baseUrl = "/api" + endPoint;

    const newEndPoint = this.baseUrl;
    const config = {
      method: endPoint.includes("event") || endPoint.includes("artists") ? "PUT" : "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await fetch(newEndPoint, config);

    if (await this.updateToken(res)) {
      const refetchResult = await this.refetch(newEndPoint, config);
      return refetchResult;
    }

    return res;
  }

  async delete<T extends DeleteEndPoint>(endPoint: T, body?: DeleteBodyType<T>) {
    this.baseUrl = "/api" + endPoint;

    const newEndPoint = this.baseUrl;
    const config = {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await fetch(newEndPoint, config);
    if (await this.updateToken(res)) {
      const refetchResult = await this.refetch(newEndPoint, config);
      return refetchResult;
    }

    return res;
  }
}

export const instance = new Api();

type GetEndPoint =
  | "/event"
  | "/event/like"
  | `/event/${string}/like`
  | `/event/${string}`
  | "/artist/group"
  | `/artist/${string}`
  | "/group/solo"
  | `/reviews/${string}`
  | `/users/${string}/artists`
  | `/reviews/user/${string}`
  | "/group"
  | "/artist"
  | "/users/nickname"
  | `/event/update/application/${string}`
  | `/event/${string}/artist`
  | "/event/popularity"
  | "/event/new";
type PostEndPoint =
  | "/event"
  | "/event/like"
  | "/users"
  | `/users/${string}/artists`
  | "/auth"
  | "/auth/token"
  | "/artist"
  | "/group"
  | "/artist/request"
  | "/file/upload"
  | "/reviews"
  | `/reviews/${string}/like`
  | "/email"
  | "/email/verification"
  | "/email/user"
  | "/event/update/application"
  | "/event/update/approval"
  | "/artist/request"
  | "/event/claim"
  | `/reviews/${string}/claims`;

type PutEndPoint = `/event/${string}` | `/users/${string}/profile` | `/users/${string}/password` | `/users/${string}/artists` | "/users/password";
type DeleteEndPoint = `/users/${string}/artists` | `/reviews/${string}/images` | `/users/${string}` | "/auth";
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
                        : T extends "/email/user"
                          ? Req_Post_Type["resetPw"]
                          : T extends "/event/update/application"
                            ? Req_Post_Type["edit"]
                            : T extends "/event/update/approval"
                              ? Req_Post_Type["approve"]
                              : T extends "/artist/request"
                                ? Req_Post_Type["request"]
                                : T extends "/event/claim"
                                  ? Req_Post_Type["eventClaim"]
                                  : T extends `/reviews/${string}/claims`
                                    ? Req_Post_Type["reviewClaim"]
                                    : unknown;

type GetQueryType<T> = T extends "/event"
  ? Req_Query_Type["행사목록"]
  : T extends "/event/like"
    ? Req_Query_Type["행사좋아요"]
    : T extends `/event/${string}/like`
      ? Req_Query_Type["유저좋아요"]
      : T extends "/event/popularity" | "/event/new"
        ? Req_Query_Type["행사캐러셀"]
        : T extends `/event/update/application/${string}`
          ? Req_Query_Type["수정상세"]
          : T extends `/event/${string}/artist`
            ? Req_Query_Type["아티스트행사"]
            : T extends `/event/${string}`
              ? Req_Query_Type["행사상세"]
              : T extends "/artist/group"
                ? Req_Query_Type["아티스트"]
                : T extends `/artist/${string}`
                  ? Req_Query_Type["멤버"]
                  : T extends "/group/solo"
                    ? Req_Query_Type["그룹솔로"]
                    : T extends `/reviews/user/${string}`
                      ? Req_Query_Type["유저리뷰"]
                      : T extends `/reviews/${string}`
                        ? Req_Query_Type["리뷰"]
                        : T extends "/group"
                          ? Req_Query_Type["그룹조회"]
                          : T extends "/artist"
                            ? Req_Query_Type["멤버조회"]
                            : T extends "/users/nickname"
                              ? Req_Query_Type["닉네임"]
                              : unknown;
// 사용하실 때 직접 추가 부탁드립니다!
type PutBodyType<T> = T extends `/event/${string}`
  ? Req_Post_Type["event"]
  : T extends `/users/${string}/profile`
    ? Req_Put_Type["profile"]
    : T extends `/users/${string}/password`
      ? Req_Put_Type["password"]
      : T extends `/users/${string}/artists`
        ? Req_Put_Type["artists"]
        : T extends "/users/password"
          ? Req_Put_Type["resetPw"]
          : any;
type DeleteBodyType<T> = T extends `/users/${string}/artists` ? Req_Delete_Type["myArtist"] : T extends `/users/${string}` ? Req_Delete_Type["user"] : any;
