class Oauth {
  #CLIENT_ID_NAVER = "EmSmSG9VPVMXUCg7PNva";
  #CLIENT_ID_KAKAO = "099d6b163e8aa68cff0c93909cfb7603";
  #REDIRECT_URI_NAVER = "http://localhost:3000/oauth/callback/naver";
  #REDIRECT_URI_KAKAO = "http://localhost:3000/oauth/callback/kakao";
  kakao() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.#CLIENT_ID_KAKAO}&redirect_uri=${this.#REDIRECT_URI_KAKAO}&response_type=code`;
  }
  naver() {
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${this.#CLIENT_ID_NAVER}&state=STATE_STRING&redirect_uri=${this.#REDIRECT_URI_NAVER}`;
  }
}

export const OAUTH = new Oauth();
