"use client";

import { useState } from "react";
import TabButton from "./TabButton";
import DescriptionTab from "./tabs/DescriptionTab";
import LocationTab from "./tabs/LocationTab";
import ReviewTab from "./tabs/ReviewTab";

type Tabs = "행사정보" | "위치" | "후기";

const Tabs = () => {
  const [tab, setTab] = useState<Tabs>("행사정보");

  return (
    <section>
      <div className="flex gap-12">
        <TabButton onClick={() => setTab("행사정보")} selected={tab === "행사정보"}>
          행사정보
        </TabButton>
        <TabButton onClick={() => setTab("위치")} selected={tab === "위치"}>
          위치
        </TabButton>
        <TabButton onClick={() => setTab("후기")} selected={tab === "후기"}>
          후기
        </TabButton>
      </div>
      {tab === "행사정보" && <DescriptionTab />}
      {tab === "위치" && <LocationTab />}
      {tab === "후기" && <ReviewTab />}
    </section>
  );
};

export default Tabs;
