"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ArtistProfile from "./ArtistProfile";
import { MockData } from "./ProfileMockData";

const Artists = () => {
  // 무한스크롤 수정해야하는 부분
  const [artists, setArtists] = useState(MockData);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    const newArtists = [...artists, ...MockData];
    setArtists(newArtists);

    if (newArtists.length >= MockData.length) {
      setHasMore(false);
    }
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
          {MockData.map((artist, index) => (
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
