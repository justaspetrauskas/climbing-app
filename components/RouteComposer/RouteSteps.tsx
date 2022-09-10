import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRouteComposerState } from "../../redux/store";
import ImageUpload from "./ImageUpload/ImageUpload";

import RouteDetailsForm from "./RouteDetails/RouteDetailsForm";
import RouteLocation from "./RouteLocation/RouteLocation";
import RouteSubmit from "./RouteSubmit/RouteSubmit";

const RouteCanvas = dynamic(() => import("./RouteCanvas/RouteCanvas"), {
  ssr: false,
});

const RouteSteps = () => {
  const { currentStepIndex } = useSelector(selectRouteComposerState);
  useEffect(() => {
    console.log("currentStepIndex", currentStepIndex);
  }, [currentStepIndex]);
  switch (currentStepIndex) {
    case 0:
      return <RouteDetailsForm />;
    case 1:
      return <RouteLocation />;
    case 2:
      return <ImageUpload />;
    case 3:
      return <RouteCanvas />;
    case 4:
      return <RouteSubmit/>;
    default:
      return <RouteDetailsForm />;
  }
};

export default RouteSteps;
