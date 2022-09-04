import React, { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { routeGrades } from "./routeLevels";

import style from "./routeDetailForm.module.css";

interface RouteGradeSliderProps {
  registerField: UseFormRegister<any>;
  formfield: keyof Record<string, any>;
  validationRules: { required?: boolean; pattern?: RegExp; maxLength?: number };
}

const RouteGradeSlider = ({
  registerField,
  validationRules,
  formfield,
}: RouteGradeSliderProps) => {
  const [currentGrade, setCurrentGrade] = useState(14);
  const [gradeLabel, setGradeLabel] = useState("7a");

  useEffect(() => {
    if (routeGrades) {
      let gradeLabel = routeGrades.find(
        (grade) => grade.value === currentGrade
      );
      setGradeLabel(gradeLabel!.label);
    }
  }, [currentGrade]);

  const changeGradeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currGrade = +e.target.value;
    setCurrentGrade(currGrade);
  };

  return (
    <div className={style["form-field"]}>
      <label className={style.formInputLabel} htmlFor={`input-difficulty`}>
        Route difficulty
      </label>

      <span id="rs-bullet" className={style.currentGrade}>
        {gradeLabel}
      </span>
      <input
        className={`${style.formInput} ${style.rangeInput}`}
        id={`input-difficulty`}
        type="range"
        max={27}
        min={1}
        step={1}
        {...registerField(formfield, validationRules)}
        // value={currentGrade}
        onChange={changeGradeHandler}
      />
    </div>
  );
};

export default RouteGradeSlider;
