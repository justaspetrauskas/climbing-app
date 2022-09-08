import React, { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { useDispatch } from "react-redux";
import { getCroppedImage } from "../../../lib/cropImage";
import { setImageUrl } from "../../../redux/slices/newRouteReducer";
import Button from "../../UILayout/Button/Button";
import style from "./imageUpload.module.css";

interface ImageCropperProps {
  imageSrc: string;
}

const ImageCropper = ({ imageSrc }: ImageCropperProps) => {
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

  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels!);
      dispatch(setImageUrl(croppedImage!));
    } catch (error) {
      console.log(error);
    }
  };

  const resetImage = () => {
    // set preview image to ""
    // upload image imput function
  };
  const cropImage = () => {
    // set Image for the drawing component
    // set preview image to ""
  };

  return (
    <div className={style["image-crop-wrapper"]}>
      <div className={style["image-crop-container"]}>
        <Cropper
          image={imageSrc}
          crop={crop}
          classes={{ cropAreaClassName: style["image-crop-area"] }}
          //   rotation={rotation}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          //    onRotationChange={setRotation}
        />
      </div>
      <div className={style["crop-controls"]}>
        <Button size="sm" type="Secondary" clickHandler={resetImage}>
          Change Image
        </Button>
        <Button size="sm" type="Primary" clickHandler={cropImage}>
          Crop Image
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;
