import AlertModal from "./AlertModal";
import InputModal from "./InputModal";
import TextModal from "./TextModal";

const Modal = Object.assign(AlertModal, {
  Alert: AlertModal,
  Input: InputModal,
  Text: TextModal,
});

export default Modal;
