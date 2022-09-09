import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImagePreview } from "../../../redux/slices/imageUploadReducer";
import { selectImageUploadState } from "../../../redux/store";
import DropZone from "../../DropZone/DropZone";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";
import FormLayout from "../FormLayout";
import ImageCropper from "./ImageCropper";
import style from "./imageUpload.module.css";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const { imagePreview } = useSelector(selectImageUploadState);

  const onImageUpload = () => {};
  return (
    <FormLayout>
      <InputFieldContainer label={"Upload an image"}>
        <div className={style["upload-container"]}>
          {imagePreview ? (
            <ImageCropper imageSrc={imagePreview} />
          ) : (
            <DropZone />
          )}
        </div>
      </InputFieldContainer>
    </FormLayout>
  );
};

export default ImageUpload;
