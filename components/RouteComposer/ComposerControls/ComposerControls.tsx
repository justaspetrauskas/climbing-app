import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goToNextStep,
  goToPrevStep,
} from "../../../redux/slices/routeComposerReducer";
import {
  selectNewRouteState,
  selectRouteComposerState,
} from "../../../redux/store";
import IconButton from "../../IconButton/IconButton";
import Button from "../../UILayout/Button/Button";

import style from "./controls.module.css";

const ComposerControls = () => {
  const { data, status } = useSession();
  const { steps, activeStep, currentStepIndex } = useSelector(
    selectRouteComposerState
  );
  const route = useSelector(selectNewRouteState);
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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.persist();
    const { user } = data!;
    console.log("Route info", route);
    console.log("user", user);
    try {
      const res = await fetch("/api/lines/new", {
        method: "POST",
        body: JSON.stringify(route),
      });
      // const postedData = await res.json();
      // await loginUser(data);
      // router.replace("/profile");
    } catch (err: any) {
      console.log(err);
    }
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
        {currentStepIndex == steps.length - 1 && (
          <button onClick={(e) => handleSubmit(e)}>Upload Route</button>
        )}
      </div>
    </div>
  );
};

export default ComposerControls;
