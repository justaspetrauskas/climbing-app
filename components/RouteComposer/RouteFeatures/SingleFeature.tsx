import React from "react";
import PillButton from "../../UILayout/PillButton/PillButton";
import style from "./routeFeatures.module.css";

interface SingleFeatureProps {
  selected: boolean;
  feature: string;
  selectHandler: (feature: string) => void;
}
const SingleFeature = ({
  selected = false,
  feature,
  selectHandler,
}: SingleFeatureProps) => {
  const selectFeature = (e: any) => {
    e.preventDefault();
    selectHandler(feature);
  };

  return (
    <PillButton clickHandler={(e) => selectFeature(e)} active={selected}>
      {feature}
    </PillButton>
  );
};

export default SingleFeature;
