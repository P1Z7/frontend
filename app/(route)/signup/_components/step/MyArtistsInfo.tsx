import { useQuery } from "@tanstack/react-query";
import { ArtistNGroupListType, ArtistNGroupType } from "app/_constants/mock";
import { GetData } from "app/api/useQuery";
import { useFormContext, useWatch } from "react-hook-form";
import BottomButton from "@/components/button/BottomButton";
import { SignUpFormType } from "@/types/index";
import SearchArtist from "../../../../_components/SearchArtist";

const MyArtistsInfo = () => {
  const { setValue } = useFormContext<SignUpFormType>();
  const { data } = useQuery<ArtistNGroupListType>({ queryKey: ["artist/group"], queryFn: GetData });
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

  if (!data?.artistAndGroupList) return;

  return (
    <>
      <SearchArtist data={MOCK} onClick={handleClick} myArtists={myArtists} />
      <BottomButton isDisabled={isButtonDisabled} isSkip>
        오프너 시작하기
      </BottomButton>
    </>
  );
};

export default MyArtistsInfo;
