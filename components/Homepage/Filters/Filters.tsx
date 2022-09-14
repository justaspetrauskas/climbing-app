import React, { useState } from "react";
import style from "./filters.module.css";

import { useSelector } from "react-redux";
import { selectRouteFeatures } from "../../../redux/store";
import Button from "../../UILayout/Button/Button";
// import Options from "./Options";

const Filters = () => {
  const { features, grades } = useSelector(selectRouteFeatures);
  const [option, setOption] = useState<1 | 2 | 3 | null>(null);

  const selectOption = (o: 1 | 2 | 3 | null) => {
    if (option === o) {
      setOption(null);
    } else {
      setOption(o);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style["features-header"]}>
        <Button
          type={"Secondary"}
          styled={"rounded"}
          size="sm"
          active={option === 1}
          clickHandler={() => selectOption(1)}
        >
          Features
        </Button>
        <Button
          type={"Secondary"}
          styled={"rounded"}
          size="sm"
          active={option === 2}
          clickHandler={() => selectOption(2)}
        >
          Grades
        </Button>
        <Button
          type={"Secondary"}
          styled={"rounded"}
          size="sm"
          active={option === 3}
          clickHandler={() => selectOption(3)}
        >
          Radius
        </Button>
      </div>

      {option !== null && <Options option={option} features={features} />}
    </div>
  );
};

export default Filters;

interface OptionsProps {
  option: 1 | 2 | 3;
  features: string[];
}
const Options = ({ option, features }: OptionsProps) => {
  switch (option) {
    case 1:
      return <Features features={features} />;
    case 2:
      return <div className={style["options-wrapper"]}>{option}</div>;
    case 3:
      return <div className={style["options-wrapper"]}>{option}</div>;
  }
};
interface FeaturesProps {
  features: string[];
}
const Features = ({ features }: FeaturesProps) => {
  return (
    <div className={style["options-wrapper"]}>
      <div className={style.container}>
        {features.length > 0 &&
          features.map((f, index) => (
            <button className={style["feature-item"]}>{f}</button>
          ))}
      </div>
    </div>
  );
};
