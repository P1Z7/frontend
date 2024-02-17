import MobileHeader from "@/components/header/MobileHeader";
import DottedLayout from "@/components/layout/DottedLayout";
import MyArtistEvent from "./_components/MyArtistEvent";

const MyArtistEventPage = () => {
  return (
    <DottedLayout size="wide">
      <MobileHeader />
      <div className="flex flex-col px-20 pb-88 pt-16">
        <MyArtistEvent />
      </div>
    </DottedLayout>
  );
};

export default MyArtistEventPage;
