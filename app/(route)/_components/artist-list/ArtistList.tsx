"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ArtistCard from "@/components/ArtistCard";
import { ProfileMockData } from "./ProfileMockData";

const ArtistList = () => {
  const [artists, setArtists] = useState(ProfileMockData);
  const [hasMore, setHasMore] = useState(true);

  // 이부분 바꿔야함 일단 무한스크롤 잘 되는지 테스트용..
  const loadMore = () => {
    const newArtists = [...artists, ...ProfileMockData];

    // 데이터가 9개 이상이면 무한스크롤 계속 진행
    if (newArtists.length >= 9) {
      setHasMore(true);
    } else {
      // 9개 미만이면 더 이상 무한스크롤 하지 않음
      setHasMore(false);
    }

    // 새로운 아티스트 데이터를 적용
    setArtists(newArtists);
  };

  return (
    <div className="flex flex-col gap-16">
      <h2 className="text-20 font-700 text-gray-900">아티스트로 찾아보기</h2>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        className="w-320"
      >
        <ul className="grid w-320 grid-cols-3 gap-12 px-8">
          {artists.map((artist, index) => (
            <li key={index}>
              <ArtistCard profileImage={artist.profileImage}>{artist.name}</ArtistCard>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default ArtistList;
