import { ReactNode } from "react";

interface Props {
  render: () => ReactNode;
}

const ArtistList = ({ render }: Props) => {
  return <div className="grid h-[34rem] grid-cols-3 justify-items-center overflow-y-scroll">{render()}</div>;
};

export default ArtistList;
