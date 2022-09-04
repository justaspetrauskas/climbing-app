import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "../../MapComponent/MapComponent";
import IconButton from "../../IconButton/IconButton";

import style from "../../../styles/routeComponent.module.css";
import { FaLocationArrow } from "react-icons/fa";
import { setRouteLocation } from "../../../redux/slices/newRouteReducer";
import { selectNewRouteState } from "../../../redux/store";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { setCurrentLocation } from "../../../redux/slices/mapLocationReducer";

const validLatitude = new RegExp("^[-+]?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,18}$");
const validLongitude = new RegExp(
  "^-?(?:1[0-7]|[1-9])?\\d(?:\\.\\d{1,18})?|180(?:\\.0{1,18})?$"
);

const RouteLocation = () => {
  const dispatch = useDispatch();
  const { routeLocation } = useSelector(selectNewRouteState);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
    libraries: ["places"],
  });

  const [latitude, setLatitude] = useState<string>(" ");
  const [longitude, setLongitude] = useState<string>(" ");
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

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

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
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

  if (isLoaded) {
    return (
      <div className={style.wrapper}>
        {/* coordinates input */}
        {/* <Autocomplete
          onLoad={(autocomplete) => setAutocomplete(autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input type="text" placeholder="Place" />
        </Autocomplete> */}

        <div className={style["input-wrapper"]}>
          <div className={style["coordinates-input-wrapper"]}>
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
  } else {
    return <div>Loading...</div>;
  }
};

export default RouteLocation;
