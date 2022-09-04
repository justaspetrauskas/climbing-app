import React from "react";
import { MdDone } from "react-icons/md";
import ProgressStep from "./ProgressStep";

import style from "./routeComposer.module.css";

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

        <ProgressStep
          completed={true}
          stepTitle={"Route Description"}
          active={false}
        />
        <ProgressStep
          completed={false}
          stepTitle={"Route Canvas"}
          active={true}
        />
        <ProgressStep
          completed={false}
          stepTitle={"One Last Peek"}
          active={false}
        />
      </div>
    </div>
  );
};

export default ProgressInfo;
