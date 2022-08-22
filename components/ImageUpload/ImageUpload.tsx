import React from "react";
import { useForm } from "react-hook-form";
import style from "../../styles/imageUpload.module.css";
import DropZone from "../DropZone/DropZone";

const ImageUpload = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // "onChange"
  });
  return (
    <div className={style.wrapper}>
      <DropZone />
      {/* <form action=""></form>
      ImageUpload */}
    </div>
  );
};

export default ImageUpload;
