import { Api } from "@/api/api";
import { setSession } from "@/store/session/cookies";
import { openToast } from "@/utils/toast";
import { TOAST_MESSAGE } from "@/constants/toast";

export const handleSignupSubmit = async (userInput: any, instance: Api) => {
  const { email, password, passwordCheck, nickName, myArtists } = userInput;
  try {
    const signupRes = await instance.post("/users", {
      userName: "",
      signupMethod: "opener",
      email,
      password,
      passwordCheck,
      nickName,
      myArtists,
    });

    if (signupRes.error) {
      throw new Error(signupRes.error);
    }

    const signinRes = await instance.post("/auth", {
      email,
      password,
      signinMethod: "opener",
    });

    if (signinRes.error) {
      throw new Error(signinRes.error);
    }

    setSession({ isAuth: true, user: signinRes });

    openToast.success(`opener가 되셨습니다! ${signinRes?.nickName}님`);

    return signinRes;
  } catch (error: any) {
    if (error.message === "exist user") {
      openToast.error(TOAST_MESSAGE.user.email);
    }
    if (error.message === "Bad Request") {
      openToast.error(TOAST_MESSAGE.user.signupError);
    }
  }
};
