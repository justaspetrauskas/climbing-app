import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const RouteDetailsForm = () => {
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
  // useEffect(() => {
  //   handleSubmit((data) => console.log(data));
  // }, [data]);

  useEffect(() => {
    // validation functionality
  }, [routeDetails]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputName = e.target.name;
    const inputVal = e.target.value;
    console.log(e.target.name);
    //
    setRouteDetaisl({ ...routeDetails, [inputName]: inputVal });
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
        <RouteFeatures
          featuresVal={routeDetails.features}
          onInputChange={handleInputChange}
        />
      </form>
    </FormLayout>
  );
};

export default RouteDetailsForm;
