"use client";

import { Suspense } from "react";
import MetaTag from "@/components/MetaTag";
import SearchInput from "@/components/input/SearchInput";
import DottedLayout from "@/components/layout/DottedLayout";
import ArtistList from "./_components/ArtistList";
import EventList from "./_components/EventList";
import Filter from "./_components/Filter";
import useFetch from "./_hooks/useFetch";
import useSearch from "./_hooks/useSearch";
import useShowOnScroll from "./_hooks/useShowOnScroll";

const SearchPage = () => {
  const { keyword, setKeyword, sort, handleSort, status, handleStatus, filter, resetFilter, SearchBottomSheet, openSearchBottomSheet } = useSearch();
  const { events, artists, containerRef } = useFetch({ keyword, sort, status, filter });
  const visible = useShowOnScroll();

  return (
    <>
      <MetaTag
        title={keyword ? `${keyword}: 검색 결과` : "행사 둘러보기"}
        description={keyword ? `${keyword}의 Opener 행사 검색 결과입니다.` : "Opener에 등록된 각종 오프라인 행사들을 구경해 보세요."}
      />
      <DottedLayout size="wide">
        <main className={`relative w-full pb-84 [overflow-anchor:none] ${visible ? "" : "pt-112 pc:pt-0"}`}>
          <section className="sticky left-0 right-0 top-72 z-nav flex w-full flex-col bg-white-black text-14 text-gray-500 shadow-top tablet:top-64 pc:static pc:shadow-none">
            <div className="bg-white-black px-20 pb-8 pt-16 pc:px-0 pc:pb-20 pc:pt-[7rem]">
              <SearchInput keyword={keyword} setKeyword={setKeyword} initialKeyword={keyword} placeholder="최애의 이름으로 행사를 찾아보세요!" />
            </div>
            <Filter
              visible={visible}
              filter={filter}
              resetFilter={resetFilter}
              sort={sort}
              handleSort={handleSort}
              status={status}
              handleStatus={handleStatus}
              openSearchBottomSheet={openSearchBottomSheet}
            />
          </section>
          <ArtistList artists={artists} />
          <EventList events={events} containerRef={containerRef} />
        </main>
      </DottedLayout>
      <SearchBottomSheet />
    </>
  );
};

const SuspenseSearchPage = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default SuspenseSearchPage;
