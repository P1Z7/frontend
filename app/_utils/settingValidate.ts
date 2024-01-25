type Obj = {
  name: "current" | "new";
  value: string;
};

const TEXT = {
  value: "비밀번호를 입력해주세요.",
  reg: "비밀번호는 영문, 숫자 조합 8자 이상 입력해주세요.",
  same: {
    current: "비밀번호가 일치하지 않아요.",
  },
};

const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

const isValue = (obj: Obj) => {
  if (!obj.value) return TEXT.value;
  return obj;
};

const isReg = (obj: Obj) => {
  return pwReg.test(obj.value) ? obj : TEXT.reg;
};

const isCurrentPw = (obj: Obj) => {
  // 유저가 입력한 비밀번호가 맞는지 확인하는 로직 필요
  // 현재는 가짜비밀번호로 하겠음.
  const MOCK_PASSWORD = "iwant18080";

  if (obj.name === "current" && obj.value !== MOCK_PASSWORD) {
    return TEXT.same[obj.name];
  }

  return obj;
};

const pipe =
  (...funcs: ((a: Obj) => Obj | string | Promise<Obj | string>)[]) =>
  (init: Obj) => {
    const iter = funcs[Symbol.iterator]();
    return (function recursive(acc: Obj | string): string | Promise<string> {
      if (typeof acc === "string") return acc;

      for (const f of iter) {
        const res = f(acc);
        if (typeof res === "string") return res;
        if (res instanceof Promise) return res.then(recursive).catch((e) => Promise.reject(e));
      }

      return "";
    })(init);
  };

export const validateCurrentPw = pipe(isValue, isCurrentPw);
export const validateNewPw = pipe(isValue, isReg);
