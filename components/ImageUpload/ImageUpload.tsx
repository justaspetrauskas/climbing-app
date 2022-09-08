import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectImageUploadState } from "../../redux/store";

import DropZone from "../DropZone/DropZone";
import ImageCropModal from "../ImageCropModal/ImageCropModal";
import RouteLocation from "../RouteComposer/RouteLocation/RouteLocationEl";

const ImageUpload = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // "onChange"
  });
  const { imagePreview } = useSelector(selectImageUploadState);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={style.wrapper}>
      {/* <DropZone openModal={openModal} /> */}
      {/* do it as overlay */}
      {modalIsOpen && <ImageCropModal closeModal={closeModal} />}
      {/* <form action=""></form>
      ImageUpload */}
    </div>
  );
};

export default ImageUpload;
