import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  names,
  Config,
} from "unique-names-generator";

import FormLayout from "../FormLayout";
import Button from "../../UILayout/Button/Button";
import {
  goToNextStep,
  setValidateStep,
} from "../../../redux/slices/routeComposerReducer";
import { setRouteName } from "../../../redux/slices/newRouteReducer";
import {
  selectNewRouteState,
  selectRouteComposerState,
} from "../../../redux/store";

import style from "./routName.module.css";

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals, names],
  separator: " ",
};

const RouteName = () => {
  const dispatch = useDispatch();
  const { title } = useSelector(selectNewRouteState);
  const { activeStep } = useSelector(selectRouteComposerState);

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (title && errors.length < 1) {
      dispatch(setValidateStep(true));
    } else {
      dispatch(setValidateStep(false));
    }
  }, [errors, title]);

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

    dispatch(setRouteName(value));

    validate(value);
  };

  const generateRandomName = () => {
    const routeName: string = uniqueNamesGenerator({
      ...customConfig,
      length: Math.floor(Math.random() * 3) + 2,
    });
    dispatch(setRouteName(routeName));

    validate(routeName);
  };

  return (
    <FormLayout>
      <div className={style.container}>
        <div className="flex flex-col w-full gap-y-4 items-center">
          <input
            className={style["composer-input"]}
            placeholder={"Route Title"}
            type="text"
            name={"title"}
            value={title}
            onChange={handleChange}
            autoFocus
            maxLength={30}
          />
          <Button
            type={"Secondary"}
            styled={"rounded"}
            size={"sm"}
            clickHandler={(e) => generateRandomName()}
          >
            Generate Random Name
          </Button>
        </div>
        {activeStep.validated && (
          <div className="mt-12">
            <Button clickHandler={(e) => dispatch(goToNextStep())}>
              Confirm
            </Button>
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default RouteName;
