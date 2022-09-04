import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
        <div className={style["form-field"]}>
          <label className={style.formInputLabel} htmlFor={`input-routeName`}>
            Route name
          </label>
          <input
            className={style.formInput}
            placeholder={"Try to come up with descriptive name"}
            id={`input-routeName`}
            type={"text"}
            {...register("routeName", { required: true })}
          />
        </div>
        <div className={style["form-field"]}>
          <label className={style.formInputLabel} htmlFor={`input-routeName`}>
            Route Description
          </label>
          <textarea
            className={style.formInput}
            placeholder={"Try to come up with descriptive name"}
            id={`input-routeDescription`}
            rows={5}
            // {...registerField(formfield, validationRules)}
          />
        </div>
        <RouteGradeSlider
          formfield={"grade"}
          validationRules={{ required: true }}
          registerField={register}
        />
      </form>
    </div>
  );
};

export default RouteDetailsForm;
