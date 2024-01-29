import Image from "next/image";

interface Props {
  name: string;
  profileImage: string;
  onClick?: () => void;
  className: string;
}

const ArtistCard = ({ name, onClick, profileImage, className }: Props) => {
  return (
    <>
      <div className="flex w-100 flex-col items-center justify-center gap-8 rounded-sm p-12 hover:cursor-pointer hover:bg-sky-50" onClick={onClick}>
        <Image src={profileImage ? profileImage : "/icon/no-profile.svg"} alt="이미지 추가 버튼" width={80} height={80} className={`rounded-full  ${className}`} />
        <p className="text-14">{name}</p>
      </div>
    </>
  );
};

export default ArtistCard;
