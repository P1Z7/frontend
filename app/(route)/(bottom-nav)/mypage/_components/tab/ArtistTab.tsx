import Image from "next/image";
import { useRouter } from "next/navigation";
import ArtistCard from "@/components/ArtistCard";

interface Props {
  data: {
    name: string;
    profileImage: string;
  }[];
}

const ArtistTab = ({ data }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start gap-16 px-20 py-24">
      <button className="text-14 font-500 text-blue" onClick={() => router.push("/setting/favorite")}>
        팔로우 아티스트 수정하기
      </button>
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-wrap justify-center gap-20">
          {data.map((cardList) => (
            <ArtistCard
              isSmall
              key={cardList.name}
              profileImage={cardList.profileImage}
              onClick={() => {
                console.log(`${cardList.name}(으)로 검색`);
              }}
            >
              {cardList.name}
            </ArtistCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistTab;
