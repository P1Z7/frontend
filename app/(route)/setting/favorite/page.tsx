"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import useInfScroll from "@/hooks/useInfScroll";

const INITIAL = ["정우"];

const FavoritePage = () => {
  const [favorite, setFavorite] = useState<string[]>(INITIAL);
  const handleClick = (name: string) => () => {
    if (favorite.includes(name)) {
      setFavorite((prev) => prev.filter((item) => item !== name));
      return;
    }
    setFavorite((prev) => [...prev, name]);
  };

  const { isVisible, setIsVisible, infRef } = useInfScroll();
  const [cursorId, setCursorId] = useState(12);

  useEffect(() => {
    if (cursorId > MOCK.length) return;
    if (isVisible) {
      setCursorId((prev) => prev + 6);
    }
  }, [isVisible]);

  return (
    <div className="flex flex-col gap-24 overflow-auto py-24">
      <button className="w-max text-14 font-600 text-gray-500 underline underline-offset-2">{"찾으시는 아티스트가 없나요? >"}</button>
      <div className="grid h-5/6 snap-y snap-mandatory grid-cols-3 gap-20 self-start overflow-auto px-16">
        {MOCK.slice(0, cursorId).map((entity) => (
          <button onClick={handleClick(entity.name)} key={entity.name} className="flex w-max snap-start flex-col items-center gap-8">
            <div className={classNames("h-80 w-80 rounded-full bg-gray-300", { "border-[1px] border-solid border-black": favorite.includes(entity.name) })} />
            {/* <Image src={entity.profileImage} alt={`${entity.name} 사진`} /> */}
            <p className="text-16 font-600">{entity.name}</p>
          </button>
        ))}
        <div ref={infRef} />
      </div>
      <button className={classNames("rounded-sm px-16 py-12 text-16", { "bg-black text-white": favorite.length }, { "bg-gray-300 text-black": !favorite.length })}>변경하기</button>
    </div>
  );
};
export default FavoritePage;

export type ArtistType = {
  name: string;
  group?: string[];
  profileImage: string;
};

export const MOCK: ArtistType[] = [
  {
    name: "마크",
    group: ["NCT", "NCT127", "NCT DREAM"],
    profileImage: "",
  },
  {
    name: "도영",
    group: ["NCT", "NCT127"],
    profileImage: "",
  },
  {
    name: "켄지",
    profileImage: "",
  },
  {
    name: "소희",
    group: ["원더걸스"],
    profileImage: "",
  },
  {
    name: "나비스",
    profileImage: "",
  },
  {
    name: "윈터",
    group: ["aespa"],
    profileImage: "",
  },
  {
    name: "수호",
    group: ["exo"],
    profileImage: "",
  },
  {
    name: "디오",
    group: ["exo"],
    profileImage: "",
  },
  {
    name: "수영",
    group: ["소녀시대"],
    profileImage: "",
  },
  {
    name: "태연",
    group: ["소녀시대"],
    profileImage: "",
  },
  {
    name: "동해",
    group: ["슈퍼주니어"],
    profileImage: "",
  },
  {
    name: "키",
    group: ["샤이니"],
    profileImage: "",
  },
  {
    name: "민호",
    group: ["샤이니"],
    profileImage: "",
  },
  {
    name: "조이",
    group: ["레드벨벳"],
    profileImage: "",
  },
  {
    name: "아이린",
    group: ["레드벨벳"],
    profileImage: "",
  },
  {
    name: "효연",
    group: ["소녀시대"],
    profileImage: "",
  },
  {
    name: "웬디",
    group: ["레드벨벳"],
    profileImage: "",
  },
  {
    name: "카리나",
    group: ["aespa"],
    profileImage: "",
  },
  {
    name: "지젤",
    group: ["aespa"],
    profileImage: "",
  },
  {
    name: "유리",
    group: ["소녀시대"],
    profileImage: "",
  },
  {
    name: "써니",
    group: ["소녀시대"],
    profileImage: "",
  },
];
