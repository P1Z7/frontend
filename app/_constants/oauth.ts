class Oauth {
  #CLIENT_ID_NAVER = process.env.NEXT_PUBLIC_CLIENT_ID_NAVER;
  #CLIENT_ID_KAKAO = process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO;
  #REDIRECT_URI_NAVER = process.env.NEXT_PUBLIC_REDIRECT_URI_NAVER;
  #REDIRECT_URI_KAKAO = process.env.NEXT_PUBLIC_REDIRECT_URI_KAKAO;
  kakao() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.#CLIENT_ID_KAKAO}&redirect_uri=${this.#REDIRECT_URI_KAKAO}&response_type=code`;
  }
  naver() {
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${this.#CLIENT_ID_NAVER}&state=STATE_STRING&redirect_uri=${this.#REDIRECT_URI_NAVER}`;
  }
}

export const OAUTH = new Oauth();
