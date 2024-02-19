import classNames from "classnames";
import Image from "next/image";

interface Props {
  children: string;
  profileImage?: string;
  onClick?: () => void;
  isChecked?: boolean;
  isSmall?: boolean;
  isPost?: boolean;
}

const ArtistCard = ({ children, onClick, profileImage, isChecked = false, isSmall = false, isPost = false }: Props) => {
  return (
    <div className="flex-center h-fit w-fit flex-col gap-8 rounded-sm hover:cursor-pointer pc:gap-4" onClick={onClick}>
      <div className={classNames({`relative h-88 w-88 ${isSmall ? "pc:h-80 pc:w-80" : "pc:h-120 pc:w-120"}`}, { "pc:!h-80 pc:!w-80 ": isPost })}>
        <Image
          src={profileImage ? profileImage : "/image/no-profile.png"}
          alt="아티스트 이미지"
          fill
          sizes="100%"
          className={`rounded-full object-cover ${isChecked ? "border-2 border-main-pink-500" : "border border-gray-100"}`}
        />
      </div>
      <p
        className={`w-88 break-all text-center font-600 ${isSmall ? "h-20 text-14 text-gray-700 pc:w-80" : "text-16 text-gray-900 pc:text-18"} ${isPost && "pc:w-80 pc:!text-14 pc:!font-500"}`}
      >
        {children}
      </p>
    </div>
  );
};

export default ArtistCard;
