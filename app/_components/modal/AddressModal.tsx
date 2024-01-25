"use client";

import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useStore } from "@/store/index";
import ModalFrame from "./ModalFrame";

interface Props {
  setAddress: any;
}

const AddressModal = ({ setAddress }: Props) => {
  const { closeModal } = useStore((state) => ({ closeModal: state.closeModal }));

  return (
    <ModalFrame>
      <DaumPostcodeEmbed
        onComplete={(data: any) => {
          setAddress(data.address);
          closeModal();
        }}
        autoClose={false}
      />
    </ModalFrame>
  );
};

export default AddressModal;
