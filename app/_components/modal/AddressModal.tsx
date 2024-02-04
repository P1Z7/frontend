"use client";

import { PostType } from "@/(route)/post/page";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useFormContext } from "react-hook-form";
import Modal from "./ModalMaterial";

interface Props {
  closeModal: () => void;
}

const AddressModal = ({ closeModal }: Props) => {
  const { setValue } = useFormContext<PostType>();

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
