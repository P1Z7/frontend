import { Api } from "@/api/api";
import { openToast } from "@/utils/toast";
import { TOAST_MESSAGE } from "@/constants/toast";

export const handleResetPwSubmit = async (values: any, instance: Api) => {
  const { email, password, verificationNumber: code } = values;
  const verificationNumber = String(code);

  try {
    const resetPwRes = await instance.put("/users/password", {
      email,
      password,
      verificationNumber,
    });

    if (resetPwRes.error) {
      throw new Error(resetPwRes.error);
    }

    openToast.success(TOAST_MESSAGE.resetPw.success);

    return resetPwRes;
  } catch (error: any) {
    if (error.message === "Bad Request") {
      openToast.error(TOAST_MESSAGE.resetPw.error);
    }
  }
};
