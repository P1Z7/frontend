import Image from "next/image";
import Link from "next/link";

const HomeNav = () => {
  return (
    <nav className="flex flex-row gap-20">
      <NavButton href="/" button_type="홈" src="/icons/icon_home-3_black.svg" />
      <NavButton href="/search" button_type="둘러보기" src="/icons/icon_search_black.svg" />
      <NavButton href="/post" button_type="등록하기" src="/icons/icon_add-outline_black.svg" />
      <NavButton href="/mypage" button_type="마이페이지" src="/icons/icon_no-profile.svg" />
    </nav>
  );
};

interface NavButtonProps {
  href: string;
  button_type: string;
  src: string;
}

function NavButton({ href, button_type, src }: NavButtonProps) {
  return (
    <Link href={href} className="flex flex-col items-center gap-8">
      <Image src={src} alt={button_type} width={24} height={24} />
      <div>{button_type}</div>
    </Link>
  );
}

export default HomeNav;
