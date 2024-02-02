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
    <>
      <div className="flex items-center justify-between py-20">
        <p className="text-16 font-700">좋아요한 아티스트</p>
        <button onClick={() => router.push("/setting/favorite")}>버튼</button>
      </div>
      <div className="grid w-fit grid-cols-3 gap-8">
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
    </>
  );
};

export default ArtistTab;
