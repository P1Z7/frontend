import Image from "next/image";

const DescriptionTab = () => {
  return (
    <>
      <div className="relative h-400 w-full">
        <Image src="https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize" alt={"행사 정보 사진"} fill className="object-cover" />
      </div>
      <p>민지 생일 카페입니다.</p>
    </>
  );
};

export default DescriptionTab;
