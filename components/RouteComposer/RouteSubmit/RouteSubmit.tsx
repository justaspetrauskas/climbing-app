import React from "react";
import style from "./routeSubmit.module.css";
import FormLayout from "../FormLayout";
import InputField from "../../FormElements/InputField";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";
import { selectNewRouteState } from "../../../redux/store";
import { useSelector } from "react-redux";
import RouteCanvasEl from "../../UILayout/RouteCanvasElement/RouteCanvasEl";

const RouteSubmit = () => {
  const { title, difficulty, imageUrl, routeCoordinates } =
    useSelector(selectNewRouteState);
  return (
    <FormLayout>
      <InputFieldContainer label={`...and you created the...`}>
        <div className={style["submit-header"]}>
          <h2>
            {title ? title : "some name"}
            <span>{difficulty}</span>
          </h2>
        </div>
        <div className={style["submit-canvas"]}>
          <RouteCanvasEl imageUrl={imageUrl} path={routeCoordinates} />
        </div>
      </InputFieldContainer>
    </FormLayout>
  );
};

export default RouteSubmit;
