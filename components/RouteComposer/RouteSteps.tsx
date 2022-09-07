import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRouteComposerState } from "../../redux/store";
import RouteDetailsForm from "./RouteDetails/RouteDetailsForm";

const RouteSteps = () => {
  const { currentStepIndex } = useSelector(selectRouteComposerState);
  useEffect(() => {
    console.log("currentStepIndex", currentStepIndex);
  }, [currentStepIndex]);
  switch (currentStepIndex) {
    case 0:
      return <RouteDetailsForm />;
    case 1:
      return <div>route picture</div>;
    case 2:
      return <div>route picture</div>;
    case 3:
      return <div>one last peek</div>;
    default:
      return <RouteDetailsForm />;
  }
};

export default RouteSteps;
