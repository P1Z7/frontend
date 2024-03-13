import { ArtistAndGroupListType } from "@/types/index";
import ArtistProfile from "./ArtistProfile";

interface Props {
  artists: ArtistAndGroupListType | undefined;
}

const ArtistList = ({ artists }: Props) => {
  const isArtistEmpty = artists?.totalCount === 0;

  return (
    <>
      {isArtistEmpty || (
        <section className="grid min-h-184 grid-cols-[repeat(auto-fill,_108px)] justify-center gap-12 px-20 pb-12 pt-32 pc:gap-24 pc:px-0">
          {artists?.artistAndGroupList.map((artist) => <ArtistProfile key={artist.id} id={artist.id} name={artist.name} image={artist.image} />)}
        </section>
      )}
    </>
  );
};

export default ArtistList;
