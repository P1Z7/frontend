import ArtistList from "@/(route)/_components/artist-list/ArtistList";
import MetaTag from "@/components/MetaTag";
import DottedLayout from "@/components/layout/DottedLayout";
import Logo from "@/public/icon/logo.svg";
import Footer from "./_components/Footer";
import FavArtistEventsCarousel from "./_components/carousel/FavArtistEventsCarousel";
import NewestEventsCarousel from "./_components/carousel/NewestEventsCarousel";
import PopularEventsCarousel from "./_components/carousel/PopularEventsCarousel";

const Home = () => {
  return (
    <>
      <MetaTag />
      <DottedLayout size="wide">
        <div className="flex flex-col gap-40 pb-72 pc:items-center pc:pb-0 pc:pt-52">
          <main className="flex flex-col gap-40 overflow-hidden pc:w-[112rem]">
            <FavArtistEventsCarousel />
            <PopularEventsCarousel />
            <NewestEventsCarousel />
            <ArtistList />
          </main>
        </div>
        <Footer />
      </DottedLayout>
    </>
  );
};
export default Home;
