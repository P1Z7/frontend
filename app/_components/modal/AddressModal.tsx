"use client";

import React, { Dispatch, SetStateAction } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import ModalFrame from "./ModalFrame";

interface Props {
  setAddress: Dispatch<SetStateAction<string>>;
  closeModal: () => void;
}

const AddressModal = ({ setAddress, closeModal }: Props) => {
  return (
    <ModalFrame closeModal={closeModal}>
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
