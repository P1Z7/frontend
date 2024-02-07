import ArtistList from "@/(route)/_components/artist-list/ArtistList";
import Logo from "@/public/icon/logo.svg";
import Footer from "../_components/Footer";
import FavArtistEventsCarousel from "../_components/carousel/FavArtistEventsCarousel";
import NewestEventsCarousel from "../_components/carousel/NewestEventsCarousel";
import PopularEventsCarousel from "../_components/carousel/PopularEventsCarousel";

const Home = () => {
  return (
    <div className="flex flex-col gap-40 pb-72 pt-88">
      <header className="fixed left-0 top-0 z-nav h-88 w-full bg-white-black px-20 pb-16 pt-48">
        <Logo />
      </header>
      <main className="flex flex-col gap-40 overflow-hidden">
        <FavArtistEventsCarousel />
        <PopularEventsCarousel />
        <NewestEventsCarousel />
        <ArtistList />
      </main>
      <Footer />
    </div>
  );
};
export default Home;
