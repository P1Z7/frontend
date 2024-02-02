export class Api {
  private baseUrl;
  private queryString;
  private accessToken;

  constructor(token?: string) {
    this.baseUrl = "";
    this.queryString = "";
    this.accessToken = token;
  }

  private makeQueryString(querys: QueryType) {
    this.queryString = "?";
    if (querys) {
      const queryKeyList = Object.keys(querys);
      queryKeyList.forEach((query, idx) => {
        this.queryString += `${query}=${querys[query as keyof QueryType]}`;
        if (idx !== queryKeyList.length - 1) {
          this.queryString += "&";
        }
      });
    }
  }

  async get(endPoint: GetEndPoint, querys?: QueryType) {
    this.baseUrl = "/api" + endPoint;
    if (querys) {
      this.makeQueryString(querys);
    }
    const res = await fetch(querys ? this.baseUrl + this.queryString : this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }

  async post<T>(endPoint: PostEndPoint, body: T, querys?: QueryType) {
    this.baseUrl = "/api" + endPoint;
    if (querys) {
      this.makeQueryString(querys);
    }
    const res = await fetch(querys ? this.baseUrl + this.queryString : this.baseUrl, {
      method: "POST",
      body: endPoint === "/file/upload" ? (body as FormData) : JSON.stringify(body),
      headers: {
        ...(endPoint === "/file/upload" ? {} : { "Content-Type": "application/json" }),
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }

  async put<T>(endPoint: string, body: T, querys?: QueryType) {
    this.baseUrl = "/api" + endPoint;
    if (querys) {
      this.makeQueryString(querys);
    }
    const res = await fetch(querys ? this.baseUrl + this.queryString : this.baseUrl, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return await res.json();
  }

  async delete(endPoint: string, querys?: QueryType) {
    this.baseUrl = "/api" + endPoint;
    if (querys) {
      this.makeQueryString(querys);
    }
    const res = await fetch(querys ? this.baseUrl + this.queryString : this.baseUrl, {
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
