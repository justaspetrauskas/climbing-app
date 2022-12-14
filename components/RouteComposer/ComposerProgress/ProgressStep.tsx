import React from "react";
import { MdDone } from "react-icons/md";
import style from "./progress.module.css";

interface ProgressStepProps {
  completed: boolean;
  stepTitle: string;
  active: boolean;
  stepClickHandler: () => void;
}

const ProgressStep = ({
  completed = false,
  stepTitle,
  active = false,
  stepClickHandler,
}: ProgressStepProps) => {
  return (
    <button
      className={`${style["progress-step"]} ${
        active
          ? style["progress-step--active"]
          : completed
          ? style["progress-step--completed"]
          : ""
      }`}
      onClick={stepClickHandler}
    >
      {completed && (
        <i className={style["step-completed"]}>
          <MdDone size={16} />
        </i>
      )}
      <span>{stepTitle}</span>
    </button>
  );
};

export default ProgressStep;
