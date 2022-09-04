import React from "react";
import ProgressInfo from "./ProgressInfo";

import style from "./routeComposer.module.css";
import RouteDetailsForm from "./RouteDetails/RouteDetailsForm";

const RouteComposer = () => {
  return (
    <div className={style.wrapper}>
      <ProgressInfo />
      <RouteDetailsForm />
    </div>
  );
};

export default RouteComposer;
