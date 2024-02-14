import { useController, useForm } from "react-hook-form";
import { ModalBaseType } from "@/types/index";
import TextModal from "./TextModal";

const ReportModal = ({ closeModal }: ModalBaseType) => {
  const { control } = useForm();
  return <TextModal closeModal={closeModal} title="신고 사유를 알려주세요" btnText="제출하기" textareaId="report-event" control={control} />;
};

export default ReportModal;
