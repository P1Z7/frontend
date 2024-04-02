import { Metadata } from "next";
import { ReactNode } from "react";

interface Props {
  searchParams: any;
}

export async function getKeyword(context: any) {
  const { query } = context; // context 객체에서 쿼리 파라미터를 가져옴
  const keyword = query.keyword; // URL의 id 쿼리 파라미터

  // 데이터를 가져오거나 다른 작업을 수행할 수 있음
  // 예: const data = await fetchData(id);

  // props로 데이터를 전달
  return keyword;
}

const layout = ({ children, keyword }: { children: ReactNode; keyword: any }) => {
  console.log(keyword);
  return <>{children}</>;
};

export default layout;
