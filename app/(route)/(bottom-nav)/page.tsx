import ArtistList from "@/components/artist-list/ArtistList";
import FavArtistEventsCarousel from "../_components/carousel/FavArtistEventsCarousel";
import NewestEventsCarousel from "../_components/carousel/NewestEventsCarousel";
import PopularEventsCarousel from "../_components/carousel/PopularEventsCarousel";

const Home = () => {
  return (
    <>
      <main className="flex flex-col overflow-hidden px-20 pb-120 pt-60">
        <div className="flex flex-col gap-40">
          <FavArtistEventsCarousel />
          <PopularEventsCarousel />
          <NewestEventsCarousel />
          <ArtistList />
        </div>
      </main>
    </>
  );
};
export default Home;
