import { Api } from "app/api/api";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FieldValues, FormProvider, UseFormProps, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { handlePostSubmit } from "@/utils/submitPost";

interface GenericFormProps<T extends FieldValues> {
  children: React.ReactNode;
  formOptions?: UseFormProps<T>;
}

const GenericFormProvider = <T extends FieldValues>({ children, formOptions }: GenericFormProps<T>) => {
  const router = useRouter();
  const methods = useForm<T>(formOptions);
  const path = usePathname();
  const instance = new Api(process.env.NEXT_PUBLIC_ACCESS_TOKEN);

  const handleSignupSubmit = async () => {
    const userInput = methods.getValues();
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

      console.log(signinRes);

      toast("어서오세요! 로그인로직으로바꿔야됨님", {
        className: "text-16 font-600",
      });
      router.push("/");
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

  const onSubmit = async () => {
    if (path === "/post") {
      const res = await handlePostSubmit(methods.getValues(), instance);
      router.push(`/event/${res.eventId}`);
    }
    if (path === "/signup") {
      const res = await handleSignupSubmit();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GenericFormProvider;
