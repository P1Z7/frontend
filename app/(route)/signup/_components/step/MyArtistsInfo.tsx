import { useQuery } from "@tanstack/react-query";
import { Api } from "app/api/api";
import { useFormContext, useWatch } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import { SignUpFormType } from "@/types/index";
import SearchArtist from "../../../../_components/SearchArtist";

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
      <SearchArtist onClick={handleClick} myArtists={myArtists} />
      <BottomButton isDisabled={isButtonDisabled} isSkip>
        오프너 시작하기
      </BottomButton>
    </>
  );
};

export default MyArtistsInfo;
