interface Obj {
  type: "email" | "password" | "passwordCheck";
  value: string;
}

const TEXT = {
  value: {
    email: "이메일을 입력해주세요.",
    password: "비밀번호를 입력해주세요.",
    passwordCheck: "확인할 비밀번호를 입력해주세요.",
  },
  repete: "이미 사용중인 이메일입니다.",
  reg: {
    email: "올바른 이메일 주소가 아닙니다.",
    password: "비밀번호는 영문, 숫자 조합 8자 이상 입력해주세요.",
  },
  same: "비밀번호가 일치하지 않아요.",
};

const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

const isValue = (obj: Obj) => {
  if (!obj.value) return TEXT.value[obj.type];
  return obj;
};

const isReg = (obj: Obj) => {
  if (obj.type === "email") return emailReg.test(obj.value) ? obj : TEXT.reg[obj.type];
  if (obj.type === "password") return pwReg.test(obj.value) ? obj : TEXT.reg[obj.type];
  return obj;
};

// const isSameEmail = async (obj: Obj) => {
//   if (obj.type === "email") {
//     try {
//       const res = await fetch("/users/check-email", { email: obj.value });
//       return obj;
//     } catch (e) {
//       console.log(e);
//       if (e instanceof Error) {
//         return e.response?.data.message;
//       }
//     }
//   }
//   return obj;
// };

let temp = "";
const isSamePassword = (obj: Obj) => {
  if (obj.type === "password") {
    temp = obj.value;
    return obj;
  }
  if (obj.type === "passwordCheck") {
    return temp === obj.value ? "" : TEXT.same;
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

export const validate_signin = pipe(isValue, isReg);
export const validate_signup = pipe(isValue, isReg, isSamePassword);
