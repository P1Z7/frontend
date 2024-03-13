import MetaTag from "@/components/MetaTag";
import DottedLayout from "@/components/layout/DottedLayout";
import Footer from "./_components/Footer";
import SearchBar from "./_components/SearchBar";
import ArtistList from "./_components/artist-list/ArtistList";
import NewestEventsCarousel from "./_components/carousel/NewestEventsCarousel";
import PopularEventsCarousel from "./_components/carousel/PopularEventsCarousel";

const Home = () => {
  return (
    <>
      <MetaTag />
      <DottedLayout size="wide">
        <div className="flex flex-col pb-72 pt-16 pc:items-center pc:pb-0 pc:pt-56">
          <main className="flex flex-col gap-40 overflow-hidden pc:w-[112rem]">
            <SearchBar />
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
