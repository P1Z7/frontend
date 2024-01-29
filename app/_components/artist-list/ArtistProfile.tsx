import Image from "next/image";

interface ArtistProfileProps {
  src: string;
  artistName: string;
}

const ArtistProfile = ({ src, artistName }: ArtistProfileProps) => {
  return (
    // 클릭하면 해당 아티스트 검색 화면으로 넘어가야하나?
    // 저두 이거 쓸래요 Link 밖에서 달아줘용 🩷🩷
    <div className="flex w-80 flex-col items-center">
      <Image src={src} alt="프로필 이미지" width={80} height={80} />
      <p>{artistName}</p>
    </div>
  );
};

export default ArtistProfile;
