import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import style from "../../styles/mapComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectMapLocationState, selectNewRouteState } from "../../redux/store";
import { setRouteLocation } from "../../redux/slices/newRouteReducer";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullScreenControl: false,
  minZoom: 8,
  maxZoom: 24,
};

const MapComponent = () => {
  const dispatch = useDispatch();
  const { routeLocation } = useSelector(selectNewRouteState);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map) {
      if (routeLocation) {
        map.panTo(routeLocation);
      }
    }
  }, [routeLocation]);

  // load google script which loads the map
  //   const { isLoaded } = useJsApiLoader({
  //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
  //   });

  const mapClickHandler = (e: google.maps.MapMouseEvent) => {
    const coord = e.latLng;
    dispatch(setRouteLocation({ lng: coord!.lng(), lat: coord!.lat() }));
  };

  return (
    <div className={style.wrapper}>
      {/* map components */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={mapOptions}
        onClick={mapClickHandler}
        onLoad={(map) => setMap(map)}
        //   onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {routeLocation && (
          <Marker
            position={routeLocation}
            animation={google.maps.Animation.BOUNCE}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
