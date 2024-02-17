export const REG_EXP = {
  CHECK_EMAIL: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  CHECK_NICKNAME: /^[가-힣A-Za-z]{2,10}$/,
  CHECK_PASSWORD: /^[A-Za-z0-9]{8,}$/,
};

export const ERROR_MESSAGES = {
  email: {
    emailField: "이메일을 입력해주세요.",
    emailPattern: "이메일 형식으로 입력하여 주세요.",
    emailToVerify: "이메일을 확인해주세요.",
    emailDuplication: "이미 존재하는 이메일입니다",
  },
  code: {
    codeField: "인증번호를 입력해주세요",
    emailToVerify: "인증 코드가 일치하지 않습니다.",
  },
  nickName: {
    nickNameField: "닉네임을 입력해주세요.",
    nickNamePattern: "2~10자 영문 또는 한글 닉네임을 사용해주세요.",
  },
  password: {
    passwordField: "비밀번호를 입력해주세요.",
    passwordPattern: "영문과 숫자를 조합하여 8자리 이상 입력해주세요.",
    passwordToVerify: "비밀번호를 확인해주세요.",
    invalidNewPassword: "기존 비밀번호과 다른 비밀번호를 입력해주세요.",
  },
  passwordCh: {
    passwordChField: "비밀번호가 일치하지 않습니다.",
    newPasswordChField: "새 비밀번호가 일치하지 않습니다.",
  },
};
