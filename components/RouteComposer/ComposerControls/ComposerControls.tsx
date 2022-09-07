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

  const clickBackHandler = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(goToPrevStep());
  };

  const clickNextHandler = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(goToNextStep());
  };

  return (
    <div className={style["controls-wrapper"]}>
      <div className={style["controls-container"]}>
        <Button type="Secondary" clickHandler={(e) => clickBackHandler(e)}>
          Back
        </Button>
        <Button disabled={false} clickHandler={(e) => clickNextHandler(e)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ComposerControls;
