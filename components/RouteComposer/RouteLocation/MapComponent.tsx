import React, { useEffect, useState } from "react";
import { useJsApiLoader, MarkerF } from "@react-google-maps/api";
import style from "./routeLocation.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMapLocationState,
  selectNewRouteState,
} from "../../../redux/store";
import { setRouteLocation } from "../../../redux/slices/newRouteReducer";
import { setCurrentLocation } from "../../../redux/slices/mapLocationReducer";
import Map from "../../MapComponent/Map";

type googleMapsMarker = google.maps.Marker;

const MapComponent = () => {
  const dispatch = useDispatch();
  const { routeLocation } = useSelector(selectNewRouteState);
  const { currentLocation } = useSelector(selectMapLocationState);
  // load google script which loads the map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
  });

  const mapClickHandler = (e: google.maps.MapMouseEvent) => {
    const coord = e.latLng;
    if (coord) {
      dispatch(setRouteLocation({ lng: coord.lng(), lat: coord.lat() }));
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={`${style["map-container"]} mt-2`}>
        <Map mapClickHandler={mapClickHandler}>
          {routeLocation && (
            <MarkerF
              position={routeLocation}
              animation={google.maps.Animation.BOUNCE}
            />
          )}
        </Map>
      </div>
    );
  }
};

export default MapComponent;
