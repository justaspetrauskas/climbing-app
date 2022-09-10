import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleEditMode,
  setToggleHowToEdit,
  updateJointCoords,
} from "../../../redux/slices/canvasState";
import { selectCanvasState } from "../../../redux/store";
import Button from "../../UILayout/Button/Button";
import style from "./routeCanvas.module.css";

const CanvasControls = () => {
  const { editMode, howToEdit } = useSelector(selectCanvasState);
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(updateJointCoords([]));
    // edit mode false
    dispatch(setToggleEditMode(false));
  };

  const toggleHowTo = () => {
    dispatch(setToggleHowToEdit(!howToEdit));
  };

  const edit = () => {
    dispatch(setToggleEditMode(!editMode));
  };

  return (
    <div className={style["controls-container"]}>
      <Button
        styled="rounded"
        type={editMode ? "Secondary" : "Primary"}
        size="sm"
        clickHandler={edit}
      >
        Edit
      </Button>

      <Button styled="rounded" type="Primary" size="sm" clickHandler={reset}>
        Reset
      </Button>
      <Button
        styled="rounded"
        type={howToEdit ? "Secondary" : "Primary"}
        size="sm"
        clickHandler={toggleHowTo}
      >
        How to?
      </Button>
    </div>
  );
};

export default CanvasControls;
