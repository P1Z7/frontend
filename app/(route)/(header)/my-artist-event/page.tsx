import Header from "@/components/Header";
import MyArtistEvent from "./_components/MyArtistEvent";

const MyArtistEventPage = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col px-20 pt-32">
      <div className="flex items-center gap-8 self-start pb-20">
        <Header />
      </div>
      <MyArtistEvent />
    </div>
  );
};

export default MyArtistEventPage;
