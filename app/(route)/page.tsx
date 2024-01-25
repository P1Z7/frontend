import Artists from "@/components/card/Artists";
import Carousel from "@/components/card/Carousel";
import FavArtistEvents from "./_components/FavArtistEvents";
import HomeNav from "./_components/HomeNav";
import NewestEvents from "./_components/NewestEvents";
import PopularEvents from "./_components/PopularEvents";

const Home = () => {
  return (
    <main className="flex flex-col overflow-hidden px-20 pb-120 pt-60">
      <div className="flex flex-col gap-40">
        <FavArtistEvents />
        <Carousel title="실시간 인기 행사" customSettings={{ autoplay: true }}>
          <PopularEvents />
        </Carousel>
        <Carousel title="최신 등록 행사">
          <NewestEvents />
        </Carousel>
        <div>
          <h2>아티스트로 찾아보기</h2>
          <Artists />
        </div>
      </div>
      <HomeNav />
    </main>
  );
};
export default Home;
