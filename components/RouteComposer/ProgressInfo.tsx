import React from "react";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { goToStep } from "../../redux/slices/routeComposerReducer";
import { selectRouteComposerState } from "../../redux/store";
import ProgressStep from "./ProgressStep";

import style from "./routeComposer.module.css";

const ProgressInfo = () => {
  const { steps, currentStepIndex } = useSelector(selectRouteComposerState);
  const dispatch = useDispatch();

  const stepClickHandler = (stepIndex: number) => {
    // should be able to go only to validated step
    dispatch(goToStep(stepIndex));
  };
  return (
    <div className={[style["progress-wrapper"], style.col].join(" ")}>
      <div className={style["progress-container"]}>
        <div className={style["progress-bar"]}>
          {/* <div
            className={style["progress-bar--fill-vertical"]}
            style={{}}
          ></div> */}
        </div>
        {steps.map((step, index) => (
          <ProgressStep
            key={step.stepIndex}
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
