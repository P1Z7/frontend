import { useFormContext, useWatch } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import { SignUpFormType } from "@/types/index";
import SearchArtist from "../../../../_components/SearchArtist";

const MyArtistsInfo = () => {
  const { setValue } = useFormContext<SignUpFormType>();
  const myArtists = useWatch({ name: "myArtists" });
  const myArtistsInfo = useWatch({ name: "myArtistsInfo" });
  const isButtonDisabled = !myArtists.length;

  const handleClick = (name: string, id: string, isChecked: boolean) => {
    if (isChecked) {
      setValue("myArtists", [...myArtists, id]);
      setValue("myArtistsInfo", [...myArtistsInfo, { name: name, id: id }]);
    } else {
      setValue(
        "myArtists",
        myArtists.filter((artistId: string) => artistId !== id),
      );
      setValue(
        "myArtistsInfo",
        myArtistsInfo.filter((artist: { name: string; id: string }) => artist.id !== id),
      );
    }
  };

  return (
    <>
      <SearchArtist onClick={handleClick} myArtists={myArtists} myArtistsInfo={myArtistsInfo} />
      <BottomButton isDisabled={isButtonDisabled} isSkip>
        오프너 시작하기
      </BottomButton>
    </>
  );
};

export default MyArtistsInfo;
