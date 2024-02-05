import NextAuth, { DefaultUser, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "opener",
      credentials: {
        email: { label: "이메일", type: "email", placeholder: "example@kpop.com" },
        password: { label: "비밀번호", type: "password", placeholder: "영문, 숫자, 특수문자 포함 8자 이상 입력해주세요" },
      },
      async authorize(credentials) {
        //성공
        if (credentials) {
          const { email, password } = credentials;
          const signinData = { email, password, signinMethod: "opener" };
          const signinRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/authentication`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signinData),
          });
          const result = await signinRes.json();
          return { email, local_accessToken: result.accessToken, local_refreshToken: result.refreshToken };
        }
        return null;
      },
    }),
  ],
  // authorize -> signIn [로그인 시점까지]
  // jwt -> session [로그인 이후, 인가할때마다 ex) useSession() 호출할때마다]
  callbacks: {
    // profile 소셜 로그인 유저 데이터
    // account 소셜 로그인 정보값
    // user Authorize함수에서 리턴한 값
    // credientials signIn("credentials") 이렇게 호출해서 authorize 함수 없이 바로 일반로그인 시도할때, 유저가 입력한 email, password가 담긴 객체
    async signIn({ account, user }) {
      const isOAuth = account && account.provider !== "credentials";
      if (!isOAuth) {
        return true;
      }

      const signinData = {
        accessToken: account.access_token,
        email: user.email,
        signinMethod: account.provider,
      };

      const signinRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      });

      if (signinRes.status >= 400 && signinRes.status <= 500) {
        const signupData = {
          userName: user.name,
          signupMethod: account.provider,
          email: user.email,
          // password: "",
          // passwordCheck: "",
          // nickName: user.name,
          // myArtists: [],
        };
        console.log(signupData);
        const signupRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });
        console.log(signupRes.status);
        const signupResult = await signupRes.json();
        user.local_accessToken = signupResult.accessToken;
        user.local_refreshToken = signupResult.refreshToken;
        return signupRes.status === 201 ? true : false;
      }

      const signinResult = await signinRes.json();
      user.local_accessToken = signinResult.accessToken;
      user.local_refreshToken = signinResult.refreshToken;
      return true;
    },
    // signIn 함수는 무조건 boolean | string "/error/auth"
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.local_accessToken;
        token.refreshToken = user.local_refreshToken;
      }
      return token;
      // token을 리턴해서 token을 저장하는 함수
    },
    async session({ session, token }) {
      const { accessToken, refreshToken } = token;
      return { ...session, accessToken, refreshToken };
      // session을 리턴하는 함수, 이 리턴값이 useSession()의 리턴값이 됨.
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
