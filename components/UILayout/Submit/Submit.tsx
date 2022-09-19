import React, { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import style from "./submit.module.css";
interface SubmitProps {
  children?: React.ReactNode;
  label: string;
  uploadStatus: "ready" | "uploading" | "completed";
  clickHandler: (e: any) => void;
}
const Submit = ({
  children,
  label,
  clickHandler,
  uploadStatus,
}: SubmitProps) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    console.log(uploadStatus);
  }, [uploadStatus]);

  return (
    <button
      className={`${style["submit-btn"]} ${style["submit-primary"]} ${
        loading ? style["active"] : ""
      }`}
      onClick={clickHandler}
      //   disabled={!completed}
    >
      <span className={style["submit-label"]}>{label}</span>
      {(uploadStatus === "uploading" || uploadStatus === "completed") && (
        <span
          className={`${style["submit-loader"]} ${
            uploadStatus === "uploading"
              ? "animate-spin"
              : uploadStatus === "completed"
              ? style["active"]
              : ""
          }`}
          onAnimationEnd={() => setCompleted(true)}
        >
          <i
            className={`${style["submit-completed"]} ${
              completed ? style["active"] : ""
            }`}
          >
            <MdDone size={16} />
          </i>
        </span>
      )}
    </button>
  );
};

export default Submit;
