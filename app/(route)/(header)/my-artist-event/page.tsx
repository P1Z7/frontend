import BottomNav from "@/components/BottomNav";
import MyArtistEvent from "./_components/MyArtistEvent";

const MyArtistEventPage = () => {
  return (
    <>
      <div className="flex flex-col items-center px-20 pb-88 pt-16">
        <MyArtistEvent />
      </div>
      <BottomNav />
    </>
  );
};

export default MyArtistEventPage;
