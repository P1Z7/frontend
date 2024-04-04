import { ReactNode } from "react";
import { getArtist, getGroup } from "@/utils/getArtist";
import MetaTag from "@/components/MetaTag";

interface Props {
  children: ReactNode;
  params: { artistId: string };
}

const getArtistName = async (artistId: string) => {
  let res;
  try {
    const groupData = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/group?groupId=${artistId}`);
    res = await groupData.json();
    if(res.message) throw Error();
    return res;
  } catch(err){
    const artistData = await fetch(`https://${process.env.NEXT_PUBLIC_BASE_URL}/artist?artists=${artistId}`);
    res = await artistData.json();
    return res[0];
  }
};

const layout = async ({ children, params }: Props) => {  
  const res = await getArtistName(params.artistId);

  return (
    <>
      <MetaTag title={`${res?.groupName || res?.artistName} - 행사 지도`} imgUrl={res?.groupImage || res?.artistImage} description={`${res?.groupName || res?.artistName}의 행사 정보들을 지도를 통해 쉽게 확인해 보세요.`} />
      {children}
    </>
  );
};

export default layout;
