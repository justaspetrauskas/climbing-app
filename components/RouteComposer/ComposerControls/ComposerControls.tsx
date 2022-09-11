import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goToNextStep,
  goToPrevStep,
} from "../../../redux/slices/routeComposerReducer";
import { selectRouteComposerState } from "../../../redux/store";
import IconButton from "../../IconButton/IconButton";
import Button from "../../UILayout/Button/Button";

import style from "./controls.module.css";

const ComposerControls = () => {
  const { steps, activeStep, currentStepIndex } = useSelector(
    selectRouteComposerState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Form steps: ", steps);
    console.log("Active Step: ", activeStep);
    console.log("currentStepIndex: ", currentStepIndex);
  }, [steps, activeStep]);

  const clickBackHandler = () => {
    dispatch(goToPrevStep());
  };

  const clickNextHandler = () => {
    dispatch(goToNextStep());
  };

  return (
    <div className={style["controls-wrapper"]}>
      <div className={style["controls-container"]}>
        {currentStepIndex > 0 && (
          <Button type="Secondary" clickHandler={clickBackHandler}>
            Back
          </Button>
        )}
        {currentStepIndex < steps.length - 2 && (
          <Button
            disabled={!activeStep.validated}
            clickHandler={clickNextHandler}
          >
            Next Step
          </Button>
        )}
        {currentStepIndex == steps.length - 2 && <button>Submit</button>}
      </div>
    </div>
  );
};

export default ComposerControls;
