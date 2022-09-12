import React, { useEffect, useState } from "react";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";
import style from "./routeFeatures.module.css";
import SingleFeature from "./SingleFeature";

const features = [
  "morpho",
  "dyno",
  "sketchy topping",
  "dangerous landing",
  "compression",
  "tall",
  "slab",
  "very overhang",
];

interface RouteFeaturesProps {
  featureVals: [string];
  selectHandler: (feature: string) => void;
}

const RouteFeatures = ({ featureVals, selectHandler }: RouteFeaturesProps) => {
  return (
    <InputFieldContainer label={"Route features"}>
      <div className={style.wrapper}>
        {features.map((feature, index) => (
          <SingleFeature
            key={index}
            selected={featureVals ? featureVals.includes(feature) : false}
            feature={feature}
            selectHandler={(feature: string) => selectHandler(feature)}
          />
        ))}
      </div>
    </InputFieldContainer>
  );
};

export default RouteFeatures;
