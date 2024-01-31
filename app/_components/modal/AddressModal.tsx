"use client";

import { EditPostType } from "@/(route)/event/[id]/edit/page";
import { PostType } from "@/(route)/post/page";
import DaumPostcodeEmbed from "react-daum-postcode";
import { UseFormSetValue } from "react-hook-form";
import ModalFrame from "./ModalFrame";

interface Props {
  setValue: UseFormSetValue<PostType>;
  closeModal: () => void;
}

const AddressModal = ({ setValue, closeModal }: Props) => {
  return (
    <ModalFrame closeModal={closeModal}>
      <DaumPostcodeEmbed
        onComplete={(data: any) => {
          setValue("address", data.address);
          closeModal();
        }}
        autoClose={false}
      />
    </ModalFrame>
  );
};

export default AddressModal;
