import React, { useCallback, useEffect, useState } from "react";
import style from "./routeLocation.module.css";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";
import FormLayout from "../FormLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMapLocationState,
  selectNewRouteState,
} from "../../../redux/store";
import { setRouteLocation } from "../../../redux/slices/newRouteReducer";
import MapComponent from "./MapComponent";
import Button from "../../UILayout/Button/Button";
import { setUserLocation } from "../../../redux/slices/mapLocationReducer";

const validLatitude = new RegExp("^[-+]?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,18}$");
const validLongitude = new RegExp(
  "^-?(?:1[0-7]|[1-9])?\\d(?:\\.\\d{1,18})?|180(?:\\.0{1,18})?$"
);

const RouteLocation = () => {
  const dispatch = useDispatch();
  const { userLocation, currentLocation } = useSelector(selectMapLocationState);
  const { routeLocation } = useSelector(selectNewRouteState);

  const [latitude, setLatitude] = useState<string>(" ");
  const [longitude, setLongitude] = useState<string>(" ");

  useEffect(() => {
    if (routeLocation) {
      setLatitude(routeLocation.lat.toString());
      setLongitude(routeLocation.lng.toString());
    }
  }, [routeLocation]);

  useEffect(() => {
    // validate latitude
    const isValidLat = validLatitude.test(latitude);

    // validate longitude
    const isValidLng = validLongitude.test(longitude);

    // if both are valid store to redux as numbers
    if (isValidLng && isValidLat) {
      dispatch(setRouteLocation({ lat: +latitude, lng: +longitude }));
    }
    // show error message
  }, [latitude, longitude]);

  const getUsersLocation = useCallback(() => {
    // console.log("hello work");
    if (!navigator.geolocation) {
      console.log("you must enable location service");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        dispatch(setUserLocation({ lat: latitude, lng: longitude }));
        // dispatch(setCurrentLocation({ lat: latitude, lng: longitude }));
      });
    }
  }, []);

  const cordinateChangeHandler = (
    type: "latitude" | "longitude",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value
      .replace(/[A-Za-z]+/g, "")
      .replace(/,/g, ".");

    const dotValidation = new RegExp("^(?!\\.)(?!.*\\.\\.)");
    const isValidDot = dotValidation.test(inputValue);

    switch (type) {
      case "latitude":
        isValidDot && setLatitude(inputValue);
        break;
      case "longitude":
        isValidDot && setLongitude(e.target.value);
        break;
    }
  };

  const locateMe = (e: MouseEvent) => {
    // e.preventDefault();
    getUsersLocation();
  };

  return (
    <FormLayout>
      <InputFieldContainer label={"Route location"}>
        <div className={style["input-wrapper"]}>
          <div className={style["coordinates-input"]}>
            <span>
              <label>Latitude: </label>
              <input
                placeholder={"lat:"}
                value={latitude}
                maxLength={20}
                onChange={(e) => cordinateChangeHandler("latitude", e)}
              />
            </span>
            <span>
              <label>Longitude: </label>
              <input
                placeholder={"lng:"}
                value={longitude}
                maxLength={20}
                onChange={(e) => cordinateChangeHandler("longitude", e)}
              />
            </span>
          </div>
          <Button type="Primary" size="sm" clickHandler={locateMe}>
            Locate me
          </Button>
        </div>
      </InputFieldContainer>
      <InputFieldContainer label={"...or choose on the map..."}>
        <MapComponent />
      </InputFieldContainer>
    </FormLayout>
  );
};

export default RouteLocation;
