import React, { useEffect, useState } from "react";
import useForm from "../../../lib/hooks/useForm";
import { useDispatch } from "react-redux";
import { setValidateStep } from "../../../redux/slices/routeComposerReducer";
import InputField from "../../UILayout/InputFieldContainer/InputFieldContainer";
import FormLayout from "../FormLayout";
import RouteFeatures from "../RouteFeatures/RouteFeatures";

import style from "./routeDetailForm.module.css";
import RouteGradeSlider from "./RouteGradeSlider";
import { setRouteDetails } from "../../../redux/slices/newRouteReducer";

interface RouteDetails {
  title: string;
  description: string;
  grade: number;
  features: string[];
}

interface ValidationRules {
  required?: boolean;
  minChar?: boolean;
  maxChar?: number;
  minValue?: number;
  maxValue?: number;
}

const RouteDetailsForm = () => {
  const dispatch = useDispatch();
  const { handleChange, values, errors, handleSelect } = useForm();
  const { title, description, grade, features } = values;

  useEffect(() => {
    if (title && grade && !errors.title && !errors.grade) {
      dispatch(setValidateStep(true));
      dispatch(setRouteDetails(values));
    } else {
      dispatch(setValidateStep(false));
    }
  }, [errors, values]);

  return (
    <FormLayout>
      <form
        className={style["form-container"]}
        action=""
        // onSubmit={handleSubmit((data) => setData(data))}
      >
        <InputField label="Route name">
          <input
            className={style.formInput}
            placeholder={"Try to come up with descriptive name"}
            id={`title`}
            type={"text"}
            name={"title"}
            value={title}
            onChange={handleChange}

            // {...register("routeName", {
            //   required: true,
            //   max: 20,
            //   min: 0,
            //   maxLength: 20,
            // })}
          />
        </InputField>

        <InputField label="Route description">
          <textarea
            className={style.formInput}
            placeholder={"Try to come up with descriptive name"}
            id={`routeDescription`}
            rows={5}
            name={"description"}
            value={description}
            onChange={handleChange}
            // {...register("description")}
          />
        </InputField>
        <RouteGradeSlider
          // formfield={"grade"}
          // validationRules={{ required: true }}
          // registerField={register}
          gradeVal={+grade}
          onInputChange={handleChange}
        />
        <RouteFeatures featureVals={features} selectHandler={handleSelect} />
      </form>
    </FormLayout>
  );
};

export default RouteDetailsForm;
