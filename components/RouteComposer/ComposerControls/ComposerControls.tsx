import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createImage } from "../../../lib/cropImage";
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
    // console.log("Route info", route);
    // console.log("user", user);

    const urlToFile = async (url: string, filename: string, mimeType: any) => {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], filename, { type: mimeType });
    };

    const file = await urlToFile(
      route.imageUrl,
      `${route.title}.jpg`,
      "image/jpg"
    );
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rvnvud2z");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_ClOUDINARY_CLOUD}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        const uploadImage = await res.json();
        const uploadData = { ...route };
        uploadData.imageUrl = uploadImage.url;
        console.log(uploadData);
        const response = await fetch("/api/lines/new", {
          method: "POST",
          body: JSON.stringify(uploadData),
        });
        if (response.ok) {
          const reponseJson = await response.json();
          console.log(reponseJson);
        }
      }
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
