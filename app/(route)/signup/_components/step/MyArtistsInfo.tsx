import SearchArtist from "@/(route)/signup/_components/SearchArtist";
import { useFormContext, useWatch } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import { SignUpFormType } from "@/types/index";

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
    <div className="flex h-full flex-col justify-between pb-160">
      <SearchArtist onClick={handleClick} myArtists={myArtists} myArtistsInfo={myArtistsInfo} />
      <BottomButton isDisabled={isButtonDisabled} isSkip isSubmit>
        오프너 시작하기
      </BottomButton>
    </div>
  );
};

export default MyArtistsInfo;
