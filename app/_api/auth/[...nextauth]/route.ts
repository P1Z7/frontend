import NextAuth from "next-auth";
import Credentials, { CredentialsConfig } from "next-auth/providers/credentials";

interface AuthOptions {
  providers: CredentialsConfig<{ email: { label: string; type: string; placeholder: string }; password: { label: string; type: string; placeholder: string } }>[];
  pages: { signIn: string };
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "signin",
      credentials: {
        email: { label: "이메일", type: "text", placeholder: "example@kpop.com" },
        password: { label: "비밀번호", type: "password", placeholder: "영문, 숫자, 특수문자 포함 8자 이상 입력해주세요" },
      },
      async authorize(credentials, req) {
        const mock = { id: "1", name: "김하늘", email: "hankimm@example.com" };
        return mock;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
