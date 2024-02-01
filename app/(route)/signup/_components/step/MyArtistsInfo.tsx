import { MOCK } from "app/_constants/mock";
import { useFormContext, useWatch } from "react-hook-form";
import { SignUpFormType } from "@/types/index";
import SearchArtist from "../SearchArtist";

const MyArtistsInfo = () => {
  const { setValue } = useFormContext<SignUpFormType>();
  const myArtists = useWatch({ name: "myArtists" });

  const isButtonDisabled = !myArtists.length;

  const handleClick = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setValue("myArtists", [...myArtists, id]);
    } else {
      setValue(
        "myArtists",
        myArtists.filter((artistId: string) => artistId !== id),
      );
    }
  };

  return (
    <>
      <SearchArtist data={MOCK} onClick={handleClick} myArtists={myArtists} />
      <button disabled={isButtonDisabled} className="bg-slate-200 h-40 text-12">
        가입하기
      </button>
      <button className="bg-slate-200 h-40 text-12">다음에 할게요.</button>
    </>
  );
};

export default MyArtistsInfo;
