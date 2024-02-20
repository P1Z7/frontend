interface Props {
  title: string;
  description?: string;
  imgUrl?: string;
}

const MetaTag = ({ title, description, imgUrl }: Props) => {
  return (
    <>
      <title>{`${title} | Opener` || "Opener"}</title>
      <meta
        name="description"
        content={
          description ||
          "K-pop 팬을 위한 오프라인 행사 정보를 한 곳에서 쉽게 확인할 수 있는 웹사이트. 각종 카페 이벤트부터 팬광고, 팝업스토어 등 다양한 이벤트 정보를 한눈에 찾아보세요!"
        }
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={`${title} | Opener` || "Opener"} />
      <meta
        property="og:description"
        content={
          description ||
          "K-pop 팬을 위한 오프라인 행사 정보를 한 곳에서 쉽게 확인할 수 있는 웹사이트. 각종 카페 이벤트부터 팬광고, 팝업스토어 등 다양한 이벤트 정보를 한눈에 찾아보세요!"
        }
      />
      <meta property="og:image" content={imgUrl || "/public/image/meta-thumbnail.png"} />
      <meta property="og:url" content="myopener.kr" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Opener" />
      <meta property="og:locale" content="ko" />
    </>
  );
};

export default MetaTag;
