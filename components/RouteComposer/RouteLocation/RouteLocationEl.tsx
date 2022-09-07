import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "../../MapComponent/MapComponent";
import IconButton from "../../IconButton/IconButton";

import style from "./routeLocation.module.css";
import { FaLocationArrow } from "react-icons/fa";
import { setRouteLocation } from "../../../redux/slices/newRouteReducer";
import {
  selectMapLocationState,
  selectNewRouteState,
} from "../../../redux/store";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import {
  setCurrentLocation,
  setUserLocation,
} from "../../../redux/slices/mapLocationReducer";
import InputFieldContainer from "../../InputFieldContainer/InputFieldContainer";
import OverlayModal from "../../OverLayModal/OverlayModal";

const validLatitude = new RegExp("^[-+]?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,18}$");
const validLongitude = new RegExp(
  "^-?(?:1[0-7]|[1-9])?\\d(?:\\.\\d{1,18})?|180(?:\\.0{1,18})?$"
);

const RouteLocationEl = () => {
  const dispatch = useDispatch();
  const { userLocation, currentLocation } = useSelector(selectMapLocationState);
  const { routeLocation } = useSelector(selectNewRouteState);

  const [latitude, setLatitude] = useState<string>(" ");
  const [longitude, setLongitude] = useState<string>(" ");

  // const [autocomplete, setAutocomplete] =
  //   useState<google.maps.places.Autocomplete | null>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const getInputLocation = () => {
    // check if there are both values
    // if not- show error message
  };

  // const onPlaceChanged = () => {
  //   if (autocomplete !== null) {
  //     console.log(autocomplete.getPlace());
  //   } else {
  //     console.log("Autocomplete is not loaded yet!");
  //   }
  // };

  const getUsersLocation = useCallback(() => {
    // console.log("hello work");
    if (!navigator.geolocation) {
      console.log("you must enable location service");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setUserLocation({ lat: latitude, lng: longitude }));
        dispatch(setCurrentLocation({ lat: latitude, lng: longitude }));
      });
    }
  }, []);

  const openModal = (e: MouseEvent) => {
    e.preventDefault();
    getUsersLocation();
    setModalIsOpen(true);
  };

  const locateMe = (e: MouseEvent) => {
    e.preventDefault();
    getUsersLocation();
  };
  //   useEffect(() => {
  //     if (autocomplete) {
  //       const place = autocomplete.getPlace();
  //       console.log(place);
  //       if (place) {
  //         const { location } = place!.geometry!;
  //         console.log(location!.lng(), location!.lat());
  //         dispatch(
  //           setCurrentLocation({ lat: location!.lat(), lng: location!.lng() })
  //         );
  //       }
  //     }
  //   }, [autocomplete]);
  if (modalIsOpen) {
    return (
      <OverlayModal
        closeHandler={() => setModalIsOpen(false)}
        modalHeader={"Locate on Map"}
      >
        <MapComponent />
        <div className={style["map-controls"]}>
          {routeLocation && <div>{latitude}</div>}

          <IconButton type="custom" clickHandler={(e: any) => locateMe(e)}>
            <i>
              <FaLocationArrow size={14} />
            </i>
            <span>LocateMe</span>
          </IconButton>
        </div>
      </OverlayModal>
    );
  } else {
    return (
      <InputFieldContainer label={"Route location"}>
        <div className={style["input-wrapper"]}>
          <div className={style["coordinates-input"]}>
            <label>Latitude: </label>
            <input
              placeholder={"lat: "}
              value={latitude}
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

          <IconButton type="custom" clickHandler={(e) => openModal(e)}>
            <i>
              <FaLocationArrow size={14} />
            </i>
            <span>Find on map</span>
          </IconButton>
        </div>
      </InputFieldContainer>
    );
  }
};

export default RouteLocationEl;
