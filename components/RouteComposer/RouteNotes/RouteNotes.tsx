import React from "react";
import Button from "../../UILayout/Button/Button";
import Submit from "../../UILayout/Submit/Submit";
import FormLayout from "../FormLayout";
import style from "./routeNotes.module.css";

const RouteNotes = () => {
  return (
    <FormLayout>
      <div className="flex flex-col justify-center gap-y-8 h-full">
        <span className="text-xl font-semibold text-center">
          Add any additional notes about the problem
        </span>
        <textarea
          className={style.formInput}
          placeholder={"Try to come up with descriptive name"}
          id={`routeDescription`}
          rows={10}
          name={"description"}
          autoFocus
          //   value={description}
          //   onChange={handleChange}
          // {...register("description")}
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <span className="mx-auto">
          <Submit>Upload!</Submit>
        </span>
      </div>
    </FormLayout>
  );
};

export default RouteNotes;
