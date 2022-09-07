import React from "react";
import { MdDone } from "react-icons/md";
import ProgressStep from "./ProgressStep";

import style from "./routeComposer.module.css";

const formSteps = [
  { title: "Route Description", active: false, completed: false, step: 1 },
  { title: "Upload a picture", active: false, completed: false, step: 2 },
  { title: "Draw a problem", active: false, completed: false, step: 3 },
  { title: "One Last Peek", active: false, completed: false, step: 4 },
];

const ProgressInfo = () => {
  return (
    <div className={[style["progress-wrapper"], style.col].join(" ")}>
      <div className={style["progress-container"]}>
        <div className={style["progress-bar"]}>
          {/* <div
            className={style["progress-bar--fill-vertical"]}
            style={{}}
          ></div> */}
        </div>
        {formSteps.map((step) => (
          <ProgressStep
            key={step.step}
            completed={step.completed}
            stepTitle={step.title}
            active={step.active}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressInfo;
