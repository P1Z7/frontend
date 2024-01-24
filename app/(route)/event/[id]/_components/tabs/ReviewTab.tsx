import Review from "../Review";
import ReviewButton from "../ReviewButton";

const REVIEWS = [
  {
    user: {
      nickname: "민지짱",
      profileImage: "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
    },
    rate: true,
    description: "메뉴도 진짜 맛있고 특전도 너무 예뻐요. KTX타고 3시간 걸려서 갔는데 후회 없습니다. 3일차 오후라서 포카 없을까봐 걱정했는데 다행히 수량 넉넉해서 다 받았어요.",
    images: [
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
    ],
    like: 2,
  },
  {
    user: {
      nickname: "민지팬",
      profileImage: "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
    },
    rate: false,
    description: "사람 너무 많아요 특전 다나갔습니다 가실분들 참고",
    images: [
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
      "https://thumb.mtstarnews.com/06/2023/09/2023090715013844673_1.jpg/dims/optimize",
    ],
    like: 1,
  },
];

const ReviewTab = () => {
  return (
    <div className="h-400 w-full">
      <ReviewButton />
      <ul className="w-full">
        {REVIEWS.map((data, index) => (
          <li key={index}>
            <Review data={data} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewTab;
