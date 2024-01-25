import Image from "next/image";

const Banner = () => {
  return (
    <>
      <section className="relative h-400 w-full">
        <Image src="https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize" alt={"가수 사진"} priority fill className="object-cover" />
      </section>
      <section>
        <h1>파이키</h1>
        <h2>민지 (NewJeans) 생일카페</h2>
        <div className="w-full border border-solid border-black" />
        <p>
          <span>날짜</span>
          <span>24.01.19 ~ 24.-01.20</span>
        </p>
        <p>
          <span>위치</span>
          <span>서울특별시 마포구 와우산로 00-00 1층 00카페</span>
        </p>
        <p>
          <span>특전</span>
          <span>컵홀더 포토카드 엽서</span>
        </p>
        <p>
          <span>링크</span>
          <span>https://minji.com</span>
        </p>
        <p>
          <span>주최자</span>
          <span>@minji_2024</span>
        </p>
      </section>
    </>
  );
};

export default Banner;
