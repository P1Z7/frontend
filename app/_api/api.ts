export class Api {
  private baseUrl;
  private queryString;
  private accessToken;

  constructor(token?: string) {
    this.baseUrl = "";
    this.queryString = "";
    this.accessToken = token;
  }

  private makeQueryString(queryObj: QueryType) {
    this.queryString = "?";
    if (queryObj) {
      const queryKeyList = Object.keys(queryObj);
      queryKeyList.forEach((query, idx) => {
        this.queryString += `${query}=${queryObj[query as keyof QueryType]}`;
        if (idx !== queryKeyList.length - 1) {
          this.queryString += "&";
        }
      });
    }
  }

  async get(endPoint: GetEndPoint, queryObj?: QueryType) {
    this.baseUrl = "/api" + endPoint;
    if (queryObj) {
      this.makeQueryString(queryObj);
    }
    const res = await fetch(queryObj ? this.baseUrl + this.queryString : this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }

  async post<T>(endPoint: PostEndPoint, body: T, queryObj?: QueryType) {
    this.baseUrl = "/api" + endPoint;
    if (queryObj) {
      this.makeQueryString(queryObj);
    }
    const res = await fetch(queryObj ? this.baseUrl + this.queryString : this.baseUrl, {
      method: "POST",
      body: endPoint === "/file/upload" ? (body as FormData) : JSON.stringify(body),
      headers: {
        ...(endPoint === "/file/upload" ? {} : { "Content-Type": "application/json" }),
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }

  async put<T>(endPoint: string, body: T, queryObj?: QueryType) {
    this.baseUrl = "/api" + endPoint;
    if (queryObj) {
      this.makeQueryString(queryObj);
    }
    const res = await fetch(queryObj ? this.baseUrl + this.queryString : this.baseUrl, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }

  async delete(endPoint: string, queryObj?: QueryType) {
    this.baseUrl = "/api" + endPoint;
    if (queryObj) {
      this.makeQueryString(queryObj);
    }
    const res = await fetch(queryObj ? this.baseUrl + this.queryString : this.baseUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }
}

type GetEndPoint = "/artist/group" | `/artist/${string}` | "/group/solo" | "/reviews";
type PostEndPoint = "/event" | "/users" | "/authentication" | "/authentication/token" | "/artist" | "/group" | "/file/upload" | "/reviews";

interface QueryType {
  page?: number;
  size?: number;
  keyword?: string;
  category?: string;
}
