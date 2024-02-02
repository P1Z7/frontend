"use client";

import { EditPostType } from "@/(route)/(header)/event/[id]/edit/page";
import { PostType } from "@/(route)/(header)/post/page";
import DaumPostcodeEmbed from "react-daum-postcode";
import { UseFormSetValue } from "react-hook-form";
import Modal from "./ModalMaterial";

interface Props {
  setValue: UseFormSetValue<PostType>;
  closeModal: () => void;
}

/**
 * TODO: 바텀시트로 변경 예정
 */
const AddressModal = ({ setValue, closeModal }: Props) => {
  return (
    <Modal.Frame closeModal={closeModal}>
      <DaumPostcodeEmbed
        onComplete={(data: any) => {
          setValue("address", data.address);
          closeModal();
        }}
        autoClose={false}
      />
    </Modal.Frame>
  );
};

export default AddressModal;
