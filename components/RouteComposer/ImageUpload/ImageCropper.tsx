import React, { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { useDispatch } from "react-redux";
import { getCroppedImage } from "../../../lib/cropImage";
import { setImagePreview } from "../../../redux/slices/imageUploadReducer";
import { setImageUrl } from "../../../redux/slices/newRouteReducer";
import { goToNextStep } from "../../../redux/slices/routeComposerReducer";
import Button from "../../UILayout/Button/Button";
import style from "./imageUpload.module.css";

interface ImageCropperProps {
  imageSrc: string;
}

const ImageCropper = ({ imageSrc }: ImageCropperProps) => {
  const dispatch = useDispatch();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const resetImage = (e: React.FormEvent<HTMLInputElement>) => {
    const imageFile = (e.target as HTMLInputElement).files;
    console.log("Reset image file", imageFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      // store image data
      dispatch(setImagePreview(reader.result as string));
    };
    reader.readAsDataURL(imageFile![0]);
  };

  const cropImage = async () => {
    try {
      const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels!);
      // set Image for the drawing component
      dispatch(setImageUrl(croppedImage!));
      // set preview image to ""
      // dispatch(setImagePreview(""));
      // go to next step
      dispatch(goToNextStep());
    } catch (error) {
      console.log(error);
    }
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
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          //    onRotationChange={setRotation}
        />
      </div>
      <div className={style["crop-controls"]}>
        <Button size="sm" type="Secondary">
          <input
            id="fileid"
            type="file"
            style={{ opacity: 0, position: "absolute", top: 0, left: 0 }}
            onChange={resetImage}
            accept="image/*"
          />
          Change Image
        </Button>
        <Button
          size="sm"
          type="Primary"
          disabled={false}
          clickHandler={cropImage}
        >
          Crop Image
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;
