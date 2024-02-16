import Image from "next/image";

interface Props {
  children: string;
  profileImage?: string;
  onClick?: () => void;
  isChecked?: boolean;
  isSmall?: boolean;
}

const ArtistCard = ({ children, onClick, profileImage, isChecked = false, isSmall = false }: Props) => {
  return (
    <div className="flex-center h-fit w-fit flex-col gap-8 rounded-sm hover:cursor-pointer pc:gap-4" onClick={onClick}>
      <div className="relative h-88 w-88 pc:h-120 pc:w-120">
        <Image
          src={profileImage ? profileImage : "/image/no-profile.png"}
          alt="아티스트 이미지"
          fill
          sizes="8.8rem"
          className={`rounded-full object-cover ${isChecked ? "border-2 border-main-pink-500" : "border border-gray-100"}`}
        />
      </div>
      <p className={`pc:text-18 w-88 break-all text-center font-600 ${isSmall ? "h-20 text-14 text-gray-700" : "text-16 text-gray-900"}`}>{children}</p>
    </div>
  );
};

export default ArtistCard;
