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

const RouteFeatures = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectedFeatures);
  }, [selectedFeatures]);

  const selectFeature = (feature: string) => {
    if (!selectedFeatures.includes(feature))
      setSelectedFeatures([...selectedFeatures, feature]);

    if (selectedFeatures.includes(feature)) {
      const tempFeatures = [...selectedFeatures];
      const filteredFeature = tempFeatures.filter((f) => f !== feature);
      setSelectedFeatures(filteredFeature);
    }
  };

  return (
    <InputFieldContainer label={"Route features"}>
      <div className={style.wrapper}>
        {features.map((feature, index) => (
          <SingleFeature
            key={index}
            selected={selectedFeatures.includes(feature)}
            feature={feature}
            selectHandler={(feature: string) => selectFeature(feature)}
          />
        ))}
      </div>
    </InputFieldContainer>
  );
};

export default RouteFeatures;
