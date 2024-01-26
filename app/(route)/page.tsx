import Artists from "@/components/card/Artists";
import FavArtistEvents from "./_components/FavArtistEvents";
import HomeNav from "./_components/HomeNav";
import NewestEventsCarousel from "./_components/NewestEvents";
import PopularEventsCarousel from "./_components/PopularEvents";

const Home = () => {
  return (
    <main className="flex flex-col overflow-hidden px-20 pb-120 pt-60">
      <div className="flex flex-col gap-40">
        <FavArtistEvents />
        <PopularEventsCarousel />
        <NewestEventsCarousel />
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
