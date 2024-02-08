import { LabelType } from "@/types/index";
import EditCard from "./_components/EditCard";

const MOCK = [
  {
    id: 1,
    type: "수정 위치",
    editContent: "수정내용",
    count: {
      approve: 2,
      decline: 2,
    },
    createdAt: "2024-02-02T17:10:14.000Z",
  },
  {
    id: 2,
    type: "장소",
    editContent: "서울특별시 마포구 연남동 00길 00로",
    count: {
      approve: 2,
      decline: 2,
    },
    createdAt: "2024-02-02T17:10:14.000Z",
  },
  {
    id: 3,
    type: "특전",
    editContent: ["컵홀더", "포스터", "포토카드", "굿즈", "엽서", "스티커"],
    count: {
      approve: 2,
      decline: 2,
    },
    createdAt: "2024-02-02T17:10:14.000Z",
  },
  {
    id: 4,
    type: "이미지",
    editContent: [
      "https://mblogthumb-phinf.pstatic.net/MjAyMzAxMTVfMjUx/MDAxNjczNzY2MDg5NTUz.uYXNN7SABbsOL8yH7RhV6Bt1VlDGNfhzNs5RKvG20_Yg.tb6C2XC6XaDCvHZEwxkdMpmhtdFQEUzLUgvx-FgGmY0g.JPEG.geniuslab9339/IMG_0154.JPG?type=w800",
      "https://mblogthumb-phinf.pstatic.net/MjAyMzAxMTVfMTE2/MDAxNjczNzY2MDkxMDYy.7LNfUsjgwk7E0Qbn0QZUx2HwYY3AC1O6-sn0VqQlXKAg.Mb6uCsVc19Hv7wrXrCRyDl-FQfIT6euQZ3TUqucqFksg.JPEG.geniuslab9339/IMG_0157.JPG?type=w800",
      "https://i.namu.wiki/i/d8HsEuu-iKCf-yz1LXvbp9hsa9a5edPe2q1IyE5bPGXB_td5IaNGY6tjJ4DncCisWYS4wiM7_VjQ8W8XQw_kcU6K3Gn0i88AbUNrxmPuUGxPA-engXgEhDFMqY0dymbxTpNBeudfIKzpbf5VWZTtEw.webp",
      "https://i.namu.wiki/i/LUXxa23rxkYjZlLk2gQ8vZmoQ7le6KGUJ4qaOd6NraSs5x4CpcwL-mozX-xvvKW7V64KFkZgMjCAb4lCOYoEEsS7-Dj71wpUie2sdaFOC9nGO-XmPJEjgqJr8jdjCFBj9Zvw8c63hqkSU8Nj_tasSw.webp",
      "https://i.namu.wiki/i/9BZconeaF4xyV6saVQ1H6-JwvgbVPAvMfgblsfYv8MX8xkyQFoIeGEvFo3ZLtQN6QAvJYCFSTtZiks5EZAIbPc-vRPpDwhzYpxVHs01XEhCKybm__aSMHOEywnWuiOueTgOi3eCiaEacTh1a-vtFtw.webp",
    ],
    count: {
      approve: 2,
      decline: 2,
    },
    createdAt: "2024-02-02T17:10:14.000Z",
  },
  {
    id: 5,
    type: "아티스트",
    editContent: [
      {
        eventId: "be14e489-1b39-422e-aef2-f9041ef9e375",
        artistId: "454d54d7-a6c8-4c",
        artistName: "카리나",
        groupId: "e073b452-9edd-41",
        groupName: "에스파",
      },
      {
        eventId: "be14e489-1b39-422e-aef2-f9041ef9e375",
        artistId: "1fab0958-dafc-48",
        artistName: "윈터",
        groupId: "e073b452-9edd-41",
        groupName: "에스파",
      },
    ],
    count: {
      approve: 2,
      decline: 2,
    },
    createdAt: "2024-02-02T17:10:14.000Z",
  },
];

const EditApprove = () => {
  return (
    <div className="px-20 py-16">
      <section className="rounded-sm bg-gray-50 px-12 py-8 text-center text-14 text-gray-700">
        수정사항은 사용자 3인 이상의 승인 후에 반영됩니다.
        <br />
        거절이 3회 누적된 수정사항은 자동으로 삭제됩니다.
      </section>
      {MOCK.map(({ id, type, editContent, count, createdAt }) => (
        <EditCard key={id} id={id} type={type as LabelType} editContent={editContent} count={count} createdAt={createdAt} />
      ))}
    </div>
  );
};

export default EditApprove;
