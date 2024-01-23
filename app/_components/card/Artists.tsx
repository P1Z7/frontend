"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ArtistProfile from "./ArtistProfile";
import { MockData } from "./ProfileMockData";

const Artists = () => {
  const [artists, setArtists] = useState(MockData);
  const [hasMore, setHasMore] = useState(true);

  // 이부분 바꿔야함 일단 무한스크롤 잘 되는지 테스트용..
  const loadMore = () => {
    const newArtists = [...artists, ...MockData];

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
    <div className="h-200 overflow-y-auto">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
      >
        <ul className="grid w-320 grid-cols-3 gap-24 px-16">
          {artists.map((artist, index) => (
            <li key={index}>
              <ArtistProfile src={artist.profileImage} artistName={artist.name} />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default Artists;
