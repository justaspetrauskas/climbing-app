import React from "react";
import { MdDone } from "react-icons/md";
import style from "./routeComposer.module.css";

interface ProgressStepProps {
  completed: boolean;
  stepTitle: string;
  active: boolean;
}

const ProgressStep = ({
  completed = false,
  stepTitle,
  active = false,
}: ProgressStepProps) => {
  return (
    <div
      className={`${style["progress-step"]} ${
        active
          ? style["progress-step--active"]
          : completed
          ? style["progress-step--completed"]
          : ""
      }`}
    >
      <i>
        <MdDone size={18} />
      </i>
      <h4>{stepTitle}</h4>
    </div>
  );
};

export default ProgressStep;
