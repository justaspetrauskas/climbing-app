import React, { useCallback, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { setPreviewImage } from "../../redux/slices/newRouteReducer";

import style from "../../styles/dropzone.module.css";

interface UploadableFile {
  file: File;
  errors: FileError[];
}

const DropZone = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<UploadableFile | null>(null);
  const [previewFile, setPreviewFile] = useState<string>("");
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    // Do something with the files
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }))[0];
    setFile(mappedAcc);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // do a redux state
        dispatch(setPreviewImage(reader.result as string));
      };
      reader.readAsDataURL(file.file);
    } else {
    }
  }, [file]);

  return (
    <div className={style.wrapper} {...getRootProps()}>
      <input {...getInputProps()} />
      <p> Drag and drop some files her or click to select files</p>
    </div>
  );
};

export default DropZone;
