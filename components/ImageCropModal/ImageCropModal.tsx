import Image from "next/image";
import React, { useCallback, useState } from "react";
import { MdClose } from "react-icons/md";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { useDispatch, useSelector } from "react-redux";
import { selectImageUploadState } from "../../redux/store";

import style from "../../styles/routeComposer.module.css";
import IconButton from "../IconButton/IconButton";
import { setImageUrl } from "../../redux/slices/newRouteReducer";
import { createImage, getCroppedImage } from "../../lib/cropImage";
import { setImagePreview } from "../../redux/slices/imageUploadReducer";

interface ImageCropModalProps {
  closeModal: () => void;
}
const ImageCropModal = ({ closeModal }: ImageCropModalProps) => {
  const { imagePreview } = useSelector(selectImageUploadState);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const closePopUp = () => {
    // remove the image and close modal
    dispatch(setImagePreview(""));
    closeModal();
  };

  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImage(
        imagePreview,
        croppedAreaPixels!
      );
      dispatch(setImageUrl(croppedImage!));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style["overalay-container"]}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <h4>Crop Image</h4>
          <IconButton type={"custom"} clickHandler={closePopUp}>
            <MdClose size={24} />
          </IconButton>
        </div>
        <div className={style["image-wrapper"]}>
          <Cropper
            image={imagePreview}
            crop={crop}
            //   rotation={rotation}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            //   onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={style.footer}>
          <h4>Footer</h4>
          <button className={style["crop-btn"]} onClick={handleCropImage}>
            Crop Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
