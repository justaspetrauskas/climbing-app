import React from "react";
import Button from "../../UILayout/Button/Button";
import style from "./routeCanvas.module.css";

const CanvasExplanation = () => {
  const closeExplanation = () => {
    console.log("Im supposed to close the dialog");
  };

  return (
    <div className={style["container"]}>
      <h2>How to draw a route?</h2>
      <ul className={style["steps"]}>
        <li className={style["step"]}>
          <span className={style["action-title"]}>Add Points</span>
          <p>
            Start by clicking on the image, once there is more than 1 point line
            is created
          </p>
        </li>
        <li className={style["step"]}>
          <span className={style["action-title"]}>Manipulate Points</span>
          <p>By dragging the point you can change its position</p>
        </li>
        <li className={style["step"]}>
          <span className={style["action-title"]}>Delete a Point</span>
          <p>To delete a point go to edit mode</p>
        </li>
      </ul>
      <Button styled="rounded" clickHandler={closeExplanation}>
        Comprendo
      </Button>
    </div>
  );
};

export default CanvasExplanation;
