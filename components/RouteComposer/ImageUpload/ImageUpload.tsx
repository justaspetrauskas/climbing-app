import React, { useState } from "react";

import DropZone from "./DropZone";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";
import FormLayout from "../FormLayout";
import ImageCropper from "./ImageCropper";
import style from "./imageUpload.module.css";
import { useSelector } from "react-redux";
import { selectNewRouteState } from "../../../redux/store";

const ImageUpload = () => {
  const { imageUrl } = useSelector(selectNewRouteState);

  return (
    <FormLayout>
      <InputFieldContainer label={"Upload an image"}>
        <div className={style["upload-container"]}>
          {imageUrl ? <ImageCropper imageSrc={imageUrl} /> : <DropZone />}
        </div>
      </InputFieldContainer>
    </FormLayout>
  );
};

export default ImageUpload;
