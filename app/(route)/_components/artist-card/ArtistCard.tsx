import Image from "next/image";

interface Props {
  children: string;
  profileImage?: string;
  onClick?: () => void;
}

const ArtistCard = ({ children, onClick, profileImage }: Props) => {
  return (
    <div className="flex-center h-fit w-fit flex-col gap-4 hover:cursor-pointer hover:brightness-50" onClick={onClick}>
      <div className="relative h-72 w-72 pc:h-108 pc:w-108">
        <Image src={profileImage ? profileImage : "/image/no-profile.png"} alt="아티스트 이미지" fill sizes="150px" className="rounded-full object-cover" />
      </div>
      <p className="max-w-72 break-all text-center text-16 font-500 text-gray-900 pc:max-w-108 pc:text-18">{children}</p>
    </div>
  );
};

export default ArtistCard;
