import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRouteComposerState } from "../../redux/store";
import ImageUpload from "./ImageUpload/ImageUpload";

import RouteDetailsForm from "./RouteDetails/RouteDetailsForm";
import RouteFeatures from "./RouteFeatures/RouteFeatures";
import RouteGrade from "./RouteGrade/RouteGrade";
import RouteLocation from "./RouteLocation/RouteLocation";
import RouteName from "./RouteName/RouteName";
import RouteNotes from "./RouteNotes/RouteNotes";

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
      return <ImageUpload />;
    case 1:
      return <RouteCanvas />;
    case 2:
      return <RouteName />;
    case 3:
      return <RouteGrade />;
    case 4:
      return <RouteFeatures />;
    case 5:
      return <RouteLocation />;
    case 6:
      return <RouteNotes />;
    default:
      return <ImageUpload />;
  }
};

export default RouteSteps;
