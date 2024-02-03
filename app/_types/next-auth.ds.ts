import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      email: string;
      name: string;
      image: string;
    };
  }

  interface User {
    id?: string;
    email: string;
    local_accessToken: string;
    local_refreshToken: string;
  }
}
