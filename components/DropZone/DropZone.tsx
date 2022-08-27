import React, { useCallback, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { setImagePreview } from "../../redux/slices/imageUploadReducer";

import style from "../../styles/dropzone.module.css";

interface UploadableFile {
  file: File;
  errors: FileError[];
}
interface DropZoneProps {
  openModal: () => void;
}
const DropZone = ({ openModal }: DropZoneProps) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<UploadableFile | null>(null);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    // Do something with the files
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }))[0];
    console.log("hello", mappedAcc);
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
        // store image data
        dispatch(setImagePreview(reader.result as string));
        openModal();
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
