import React, { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { routeGrades } from "./routeLevels";

import style from "./routeDetailForm.module.css";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";

interface RouteGradeSliderProps {
  // registerField: UseFormRegister<any>;
  // formfield: keyof Record<string, any>;
  // validationRules: { required?: boolean; pattern?: RegExp; maxLength?: number };
  gradeVal: string | number;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const RouteGradeSlider = ({
  onInputChange,
  gradeVal,
}: RouteGradeSliderProps) => {
  const [currentGrade, setCurrentGrade] = useState(14);
  const [gradeLabel, setGradeLabel] = useState("7a");

  useEffect(() => {
    if (gradeVal) {
      let gradeLabel = routeGrades.find((grade) => grade.value === gradeVal);
      setGradeLabel(gradeLabel!.label);
    }
  }, [currentGrade]);

  const changeGradeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currGrade = +e.target.value;
    setCurrentGrade(currGrade);
    onInputChange(e);
  };

  return (
    <InputFieldContainer label={"Route difficulty"}>
      {/* <span id="rs-bullet" className={style.currentGrade}>
        current grade: {gradeLabel}
      </span> */}
      <input
        className={`${style.formInput} ${style.rangeInput}`}
        id={`input-difficulty`}
        type="range"
        max={27}
        min={1}
        step={1}
        name={"grade"}
        // {...registerField(formfield, validationRules)}
        value={gradeVal}
        onChange={changeGradeHandler}
      />

      <div className={style["grades-container"]}>
        {routeGrades!.map((grade, index) => (
          <span
            key={index}
            className={`${
              index + 1 === currentGrade ? style["active-grade"] : ""
            }`}
          >
            {grade.label}
          </span>
        ))}
      </div>
    </InputFieldContainer>
  );
};

export default RouteGradeSlider;
