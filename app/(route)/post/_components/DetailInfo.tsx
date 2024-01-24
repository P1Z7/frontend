import classNames from "classnames";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/store/index";

const DetailInfo = () => {
  const { setInfo, info } = useStore((state) => ({
    setInfo: state.setPostInfo,
    info: state.postInfo,
  }));
  const [isCheck, setIsCheck] = useState(false);
  const [imgList, setImgList] = useState<File[]>([]);
  const { register, getValues } = useForm();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    const list = [...imgList];
    for (let i = 0; i < event.target.files.length; i++) {
      list.push(event.target.files[i]);
    }
    setImgList(list);
  };

  const saveDetailInfo = () => {
    setInfo({ ...info, detail_text: getValues("detail_text"), images: imgList });
    //여기서 api 콜
  };

  useEffect(() => {
    setImgList(info?.images || []);
  }, []);

  useEffect(() => {
    setInfo({ ...info, images: imgList });
  }, [imgList]);

  return (
    <>
      <div>이미지와 설명을 작성해주세요✨</div>
      <div>*선택 입력 사항입니다.</div>
      <div>이미지</div>
      <div className="scrollbar-hide flex w-[400px] overflow-x-scroll">
        <div className="flex h-120 w-120 shrink-0 items-center justify-center bg-zinc-400">
          <label>
            추가
            <input name="profileImg" type="file" multiple className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
        {imgList.map((file, idx) => (
          <div key={idx} className="relative flex h-120 w-120 shrink-0">
            <div className="absolute right-0 top-0 z-popup" onClick={() => setImgList((prev) => prev.filter((item: File) => item !== file))}>
              삭제
            </div>
            <Image src={URL.createObjectURL(file)} alt="선택한 사진 미리보기" fill className="object-cover" />
          </div>
        ))}
      </div>
      <div>첫번째 이미지 썸네일 등록</div>
      <label>
        상세 내용
        <textarea id="detail_text" className="border-2" placeholder="내용을 입력하세요." {...register("detail_text")} />
      </label>
      <div className=" bg-slate-400">이용약관 어쩌구 저쩌구..</div>
      {isCheck ? <div onClick={() => setIsCheck(false)}>체크됨</div> : <div onClick={() => setIsCheck(true)}>체크안함</div>}
      <button disabled={!isCheck} onClick={saveDetailInfo} className={classNames("bg-slate-400", { "bg-red-200": isCheck })}>
        등록하기
      </button>
    </>
  );
};

export default DetailInfo;
