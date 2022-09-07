import React from "react";
import ComposerControls from "./ComposerControls/ComposerControls";
import ProgressInfo from "./ProgressInfo";

import style from "./routeComposer.module.css";
import RouteSteps from "./RouteSteps";

const RouteComposer = () => {
  return (
    <div className={style.wrapper}>
      <ProgressInfo />
      {/* steps */}
      <RouteSteps />
      <ComposerControls />
    </div>
  );
};

export default RouteComposer;
