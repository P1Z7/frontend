import Image from "next/image";
import { useRouter } from "next/navigation";

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
          <button
            className="flex w-100 flex-col items-center justify-center gap-8 rounded-sm p-12 hover:bg-sky-50"
            key={cardList.name}
            onClick={() => {
              console.log(`${cardList.name}(으)로 검색`);
            }}
          >
            <Image src={cardList.profileImage ? cardList.profileImage : "/icon/no-profile.svg"} alt="아티스트" width={80} height={80} />
            <p className="text-14">{cardList.name}</p>
          </button>
          // ArtistCard 컴포넌트로 대체 예정
        ))}
      </div>
    </>
  );
};

export default ArtistTab;
