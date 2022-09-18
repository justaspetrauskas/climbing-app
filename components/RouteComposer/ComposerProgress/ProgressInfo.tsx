import React from "react";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { goToStep } from "../../../redux/slices/routeComposerReducer";
import { selectRouteComposerState } from "../../../redux/store";
import ProgressStep from "./ProgressStep";

import style from "./progress.module.css";

const ProgressInfo = () => {
  const { steps, currentStepIndex } = useSelector(selectRouteComposerState);
  const dispatch = useDispatch();

  const stepClickHandler = (stepIndex: number) => {
    // should be able to go only to validated step
    console.log(steps[stepIndex]);
    // if (steps[stepIndex].validated)
    dispatch(goToStep(stepIndex));
  };
  return (
    <div className={[style["progress-wrapper"], style.col].join(" ")}>
      <div className={style["progress-container"]}>
        {steps.map((step, index) => (
          <ProgressStep
            key={index}
            completed={step.validated}
            stepTitle={step.label}
            active={index === currentStepIndex}
            stepClickHandler={() => stepClickHandler(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressInfo;
