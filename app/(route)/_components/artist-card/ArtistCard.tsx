import Image from "next/image";

interface Props {
  children: string;
  hasEvent?: boolean;
  onClick?: () => void;
  profileImage?: string;
}

const ArtistCard = ({ children, hasEvent, onClick, profileImage }: Props) => {
  return (
    <div className="flex-center relative h-fit w-fit flex-col gap-4 hover:cursor-pointer" onClick={onClick}>
      {hasEvent && <div className="flex-center absolute -top-8 left-12 z-heart rounded-sm bg-main-pink-500 px-8 text-12 font-600 text-white-black tablet:left-[3rem]">Event</div>}
      <div className={`relative h-72 w-72  tablet:h-108 tablet:w-108 ${hasEvent && "rounded-full border-2 border-main-pink-500"}`}>
        <Image src={profileImage ? profileImage : "/image/no-profile.png"} alt="아티스트 이미지" fill sizes="150px" className="rounded-full object-cover hover:brightness-50" />
      </div>
      <p className="h-48 max-w-72 break-all text-center text-16 font-500 text-gray-900 tablet:max-w-108 tablet:text-18 tablet:leading-[2.4rem]">{children}</p>
    </div>
  );
};

export default ArtistCard;
