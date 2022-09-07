import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../UILayout/InputFieldContainer/InputFieldContainer";
import RouteFeatures from "../RouteFeatures/RouteFeatures";
import RouteLocation from "../RouteLocation/RouteLocationEl";
import style from "./routeDetailForm.module.css";
import RouteGradeSlider from "./RouteGradeSlider";

const RouteDetailsForm = () => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [details, setDetails] = useState({ name: "", difficulty: "" });

  return (
    <div className={style.wrapper}>
      <form className={style["form-container"]} action="">
        <InputField label="Route name">
          <input
            className={style.formInput}
            placeholder={"Try to come up with descriptive name"}
            id={`input-routeName`}
            type={"text"}
            {...register("routeName", { required: true })}
          />
        </InputField>

        <InputField label="Route description">
          <textarea
            className={style.formInput}
            placeholder={"Try to come up with descriptive name"}
            id={`input-routeDescription`}
            rows={5}
            // {...registerField(formfield, validationRules)}
          />
        </InputField>
        <RouteGradeSlider
          formfield={"grade"}
          validationRules={{ required: true }}
          registerField={register}
        />
        <RouteFeatures />
        {/* <RouteLocation /> */}
      </form>
    </div>
  );
};

export default RouteDetailsForm;
