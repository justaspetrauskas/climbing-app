import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setValidateStep } from "../../../redux/slices/routeComposerReducer";
import InputField from "../../UILayout/InputFieldContainer/InputFieldContainer";
import FormLayout from "../FormLayout";
import RouteFeatures from "../RouteFeatures/RouteFeatures";

import style from "./routeDetailForm.module.css";
import RouteGradeSlider from "./RouteGradeSlider";

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
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [routeDetails, setRouteDetaisl] = useState<RouteDetails>({
    title: "",
    description: "",
    grade: 14,
    features: [],
  });

  const [validatedFields, setValidatedField] = useState({
    title: false,
    description: false,
    grade: false,
    features: false,
  });

  useEffect(() => {
    const numericFieldValidation = (value: number) => {
      const rules = {
        maxValue: 27,
        minValue: 1,
        required: true,
      };

      return value >= rules.minValue && value <= rules.maxValue;
    };

    const stringFieldValidation = (value: string, field: string) => {
      const rules = {
        minChar: 2,
        maxChar: field === "title" ? 30 : 200,
      };
      const trimmedValue = value.trim();

      return (
        trimmedValue.length >= rules.minChar &&
        trimmedValue.length <= rules.maxChar
      );
    };

    const fieldIsValidated = (fieldName: string, value: string | number) => {
      switch (typeof value) {
        case "number":
          return numericFieldValidation(value);
        case "string":
          return stringFieldValidation(value, fieldName);
        default:
          return stringFieldValidation(value, fieldName);
      }
    };
    console.log(fieldIsValidated("title", routeDetails.title));
    setValidatedField({
      ...validatedFields,
      title: fieldIsValidated("title", routeDetails.title),
    });
    // setValidatedField({
    //   ...validatedFields,
    //   grade: fieldIsValidated("grade", routeDetails.grade),
    // });
  }, [routeDetails]);

  // validation
  useEffect(() => {
    console.log(validatedFields);
    if (validatedFields.title === true && validatedFields.grade === true) {
      dispatch(setValidateStep(true));
      // dispatch(setRoute(jointCoords));
    } else {
      dispatch(setValidateStep(false));
    }
  }, [validatedFields]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputName = e.target.name;
    const inputVal = e.target.value;
    //
    setRouteDetaisl({
      ...routeDetails,
      [inputName]: inputName === "grade" ? parseInt(inputVal) : inputVal,
    });
  };
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
            value={routeDetails.title}
            onChange={(e) => handleInputChange(e)}

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
            value={routeDetails.description}
            onChange={(e) => handleInputChange(e)}
            // {...register("description")}
          />
        </InputField>
        <RouteGradeSlider
          // formfield={"grade"}
          // validationRules={{ required: true }}
          // registerField={register}
          gradeVal={routeDetails.grade}
          onInputChange={handleInputChange}
        />
        {/* <RouteFeatures
          featuresVal={routeDetails.features}
          onInputChange={handleInputChange}
        /> */}
      </form>
    </FormLayout>
  );
};

export default RouteDetailsForm;
