import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goToNextStep,
  setValidateStep,
} from "../../../redux/slices/routeComposerReducer";
import {
  selectNewRouteState,
  selectRouteComposerState,
} from "../../../redux/store";
import Button from "../../UILayout/Button/Button";
import FormLayout from "../FormLayout";

import { routeGrades } from "./routeLevels";

import style from "./routeGrade.module.css";
import { setRouteGrade } from "../../../redux/slices/newRouteReducer";

const RouteGrade = () => {
  const dispatch = useDispatch();
  const { difficulty } = useSelector(selectNewRouteState);
  const { activeStep } = useSelector(selectRouteComposerState);

  const [errors, setErrors] = useState<string[]>([]);

  const [currentGrade, setCurrentGrade] = useState(14);
  const [gradeLabel, setGradeLabel] = useState("7a");

  useEffect(() => {
    if (difficulty) {
      let gradeLabel = routeGrades.find((grade) => grade.value === difficulty);
      setGradeLabel(gradeLabel!.label);
      dispatch(setValidateStep(true));
    }
  }, [difficulty]);

  const validate = (value: string) => {
    if (value.length <= 1 || value.length > 30) {
      setErrors([...errors, "must be between 1 and 30 characters"]);
    } else {
      setErrors([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name, value } = e.target;
    console.log("value", value);
    dispatch(setRouteGrade(value));
  };
  return (
    <FormLayout>
      <div className={style.container}>
        <span className={style["grade-container"]}>{gradeLabel}</span>
        <div className="w-full flex flex-col items-center justify-center">
          <input
            className={`${style.formInput} ${style.rangeInput}`}
            id={`input-difficulty`}
            type="range"
            max={27}
            min={1}
            step={1}
            name={"grade"}
            value={+difficulty!}
            onChange={handleChange}
            autoFocus
          />
          <div className={style["grades-container"]}>
            {routeGrades!.map((grade, index) => (
              <span
                key={index}
                className={`${
                  index + 1 === difficulty ? style["active-grade"] : ""
                }`}
              >
                {grade.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Button clickHandler={(e) => dispatch(goToNextStep())}>
            Confirm
          </Button>
        </div>
      </div>
    </FormLayout>
  );
};

export default RouteGrade;
