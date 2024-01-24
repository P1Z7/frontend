type Obj = {
  type: "current" | "new";
  value: string;
};

const ERROR_MESSAGES = {
  current: "현재 비밀번호와 다릅니다.",
};

export const isCurrentPw = (obj: Obj) => {
  // 유저가 입력한 비밀번호가 맞는지 확인하는 로직 필요
  // 현재는 가짜비밀번호로 하겠음.
  const MOCK_PASSWORD = "iwant18080";

  if (obj.type === "current" && obj.value !== MOCK_PASSWORD) {
    return ERROR_MESSAGES[obj.type];
  }

  return obj;
};
