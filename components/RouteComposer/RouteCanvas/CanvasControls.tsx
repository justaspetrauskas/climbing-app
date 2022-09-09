import React from "react";
import Button from "../../UILayout/Button/Button";
import style from "./routeCanvas.module.css";

const CanvasControls = () => {
  return (
    <div className={style["controls-container"]}>
      <Button styled="rounded" size="sm">
        How to?
      </Button>

      <Button styled="rounded" type="Secondary" size="sm">
        Reset
      </Button>
      <Button styled="rounded" type="Secondary" size="sm">
        Edit mode
      </Button>
    </div>
  );
};

export default CanvasControls;
