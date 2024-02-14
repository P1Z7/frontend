"use server";

import { cookies } from "next/headers";

export const serverSession = () => {
  const sessionJSON = cookies().get("session")?.value;
  if (sessionJSON) {
    return JSON.parse(sessionJSON);
  }
  return "로그인 정보가 없습니다.";
};
