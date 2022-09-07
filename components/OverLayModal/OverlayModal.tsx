import React from "react";
import { MdClose } from "react-icons/md";
import IconButton from "../IconButton/IconButton";

import style from "./overlayModal.module.css";
interface OverlayModalProps {
  children: React.ReactNode;
  closeHandler: () => void;
  modalHeader: string;
}
const OverlayModal = ({
  children,
  closeHandler,
  modalHeader,
}: OverlayModalProps) => {
  return (
    <div className={style["overalay-container"]}>
      <div className={style.wrapper}>
        <div className={style["modal-header"]}>
          <h4>{modalHeader}</h4>
          <IconButton type={"custom"} clickHandler={closeHandler}>
            <MdClose size={24} />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
};

export default OverlayModal;
