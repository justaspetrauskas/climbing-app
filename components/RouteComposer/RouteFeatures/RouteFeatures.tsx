import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRouteFeatures } from "../../../redux/slices/newRouteReducer";
import {
  goToNextStep,
  setValidateStep,
} from "../../../redux/slices/routeComposerReducer";
import { selectNewRouteState } from "../../../redux/store";
import Button from "../../UILayout/Button/Button";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";
import FormLayout from "../FormLayout";
import style from "./routeFeatures.module.css";
import SingleFeature from "./SingleFeature";

const availableFeatures = [
  "morpho",
  "dyno",
  "sketchy topping",
  "dangerous landing",
  "compression",
  "tall",
  "slab",
  "very overhang",
  "sit start",
  "crimbs",
  "slopers",
  "pumpy",
  "scary",
  "cave",
  "mossy",
  "sharp",
];

const RouteFeatures = () => {
  const { features } = useSelector(selectNewRouteState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (features.length > 1) {
      dispatch(setValidateStep(true));
    } else {
      dispatch(setValidateStep(false));
    }
  }, [features]);

  const handleSelect = (feature: string) => {
    dispatch(setRouteFeatures(feature));

    // if (features.includes(feature)) {
    //   const tempFeatures = [...features];
    //   const filteredFeatures = tempFeatures.filter((f) => f !== feature);
    //   dispatch(setRouteFeatures(filteredFeatures));
    // }
  };

  return (
    <FormLayout>
      <div className="flex flex-col justify-center gap-y-8 h-full">
        <span className="text-xl font-semibold text-center">
          Select min 2 features, which best describe your route
        </span>
        <div className={style.wrapper}>
          {availableFeatures.map((feature, index) => (
            <SingleFeature
              key={index}
              selected={features ? features.includes(feature) : false}
              feature={feature}
              selectHandler={(feature: string) => handleSelect(feature)}
            />
          ))}
        </div>
        {features.length > 1 && (
          <span className="mx-auto">
            <Button clickHandler={(e) => dispatch(goToNextStep())}>
              Confirm
            </Button>
          </span>
        )}
      </div>
    </FormLayout>
  );
};

export default RouteFeatures;
