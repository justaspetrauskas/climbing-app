import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "../MapComponent/MapComponent";
import IconButton from "../IconButton/IconButton";

import style from "../../styles/routeComponent.module.css";
import { FaLocationArrow } from "react-icons/fa";
import { setRouteLocation } from "../../redux/slices/newRouteReducer";
import { selectNewRouteState } from "../../redux/store";

const validLatitude = new RegExp("^[-+]?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}$");
const validLongitude = new RegExp(
  "^-?(?:1[0-7]|[1-9])?\\d(?:\\.\\d{1,18})?|180(?:\\.0{1,18})?$"
);

const RouteLocation = () => {
  const dispatch = useDispatch();
  const { routeLocation } = useSelector(selectNewRouteState);

  const [latitude, setLatitude] = useState<string>(" ");
  const [longitude, setLongitude] = useState<string>(" ");

  useEffect(() => {
    console.log(routeLocation);
  }, [routeLocation]);

  useEffect(() => {
    // validate latitude
    const isValidLat = validLatitude.test(latitude);
    // console.log(isValidLat);
    const isValidLng = validLongitude.test(longitude);
    console.log("lng is valid", isValidLng);
    // validate longitude
    // if both are valid store to redux as numbers
    if (isValidLng && isValidLat) {
      dispatch(setRouteLocation({ lat: +latitude, lng: +longitude }));
    }
  }, [latitude, longitude]);

  const getUsersLocation = () => {
    // console.log("hello work");
    if (!navigator.geolocation) {
      console.log("you must enable location service");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setRouteLocation({ lng: longitude, lat: latitude }));
      });
    }
  };

  const cordinateChangeHandler = (
    type: "latitude" | "longitude",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value
      .replace(/[A-Za-z]+/g, "")
      .replace(/,/g, ".");

    const dotValidation = new RegExp("^(?!\\.)(?!.*\\.\\.)");

    switch (type) {
      case "latitude":
        const isValidLat = dotValidation.test(inputValue);
        if (isValidLat) {
          setLatitude(inputValue);
        }

        break;
      case "longitude":
        setLongitude(e.target.value);
        break;
    }
  };

  const getInputLocation = () => {
    // check if there are both values
    // if not- show error message
  };

  return (
    <div className={style.wrapper}>
      {/* coordinates input */}
      <div className={style["input-wrapper"]}>
        <div className={style["coordinates-input-wrapper"]}>
          <div className={style["coordinates-input"]}>
            <label>Latitude: </label>
            <input
              placeholder={"lat: "}
              value={latitude.length > 0 ? latitude : routeLocation!.lat}
              maxLength={20}
              onChange={(e) => cordinateChangeHandler("latitude", e)}
            />
            <label>Longitude: </label>
            <input
              placeholder={"lng:"}
              value={longitude}
              maxLength={20}
              onChange={(e) => cordinateChangeHandler("longitude", e)}
            />
          </div>
        </div>

        <IconButton type="custom" clickHandler={getUsersLocation}>
          <FaLocationArrow size={14} />
        </IconButton>
        <IconButton type="custom" clickHandler={getInputLocation}>
          <FaLocationArrow size={14} />
        </IconButton>
      </div>
      <MapComponent />
    </div>
  );
};

export default RouteLocation;
