import toast from "react-hot-toast";
import { Api } from "@/api/api";
import { setSession } from "@/store/session/cookies";

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

    toast(`opener가 되셨습니다! ${signinRes?.nickName}님`, {
      className: "text-16 font-600",
    });

    return signinRes;
  } catch (error: any) {
    if (error.message === "exist user") {
      toast.error("이미 존재하는 이메일입니다.", {
        className: "text-16 font-600",
      });
    }
    if (error.message === "Bad Request") {
      toast.error("가입 정보를 다시 한 번 확인해 주세요.", {
        className: "text-16 font-600",
      });
    }
  }
};
