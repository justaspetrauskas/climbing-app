import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectMapLocationState, selectNewRouteState } from "../../redux/store";
import style from "./mapComponent.module.css";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type GoogleMaps = google.maps.Map;
type googleMapsMarker = google.maps.Marker;

type MapProps = {
  mapClickHandler?: (e: google.maps.MapMouseEvent) => void;
  children: React.ReactNode;
};

const Map = ({ mapClickHandler, children }: MapProps) => {
  const { currentLocation, userLocation } = useSelector(selectMapLocationState);
  const { routeLocation } = useSelector(selectNewRouteState);

  const center = useMemo<LatLngLiteral>(
    () => userLocation || { lat: 43, lng: -80 },
    [userLocation]
  );
  const options = useMemo<MapOptions>(
    () => ({
      zoomControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      fullScreenControl: true,
      minZoom: 8,
      maxZoom: 24,
      clickableIcons: false,
      disableDefaultUI: true,
      mapId: "5a11d84cca27f71",
    }),
    []
  );

  const [map, setMap] = useState<GoogleMaps | null>(null);
  const [marker, setMarker] = useState<googleMapsMarker | null>(null);

  const onLoad = useCallback(
    (map: GoogleMaps) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
      //   setMarker(marker);
    },

    []
  );
  const onUnmount = useCallback(() => {
    setMap(null);
    // setMarker(null);
  }, []);

  const onMarkerLoad = useCallback((marker: googleMapsMarker) => {
    console.log("marker is loaded");
    setMarker(marker);
  }, []);
  const onMarkerUnmount = useCallback(() => {
    setMarker(null);
  }, []);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    const coord = e.latLng;
    if (map && coord) {
      map.panTo(coord);
      if (mapClickHandler) mapClickHandler(e);
    }
  };

  useEffect(() => {
    if (!marker) {
      setMarker(marker);
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  //   React.useEffect(() => {
  //     if (marker) {
  //       marker.setOptions(options);
  //     }
  //   }, [marker, options]);

  return (
    <GoogleMap
      mapContainerClassName={style["map-container"]}
      center={center}
      zoom={14}
      options={options}
      onClick={onMapClick}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {/* user location marker */}
      {center && (
        <MarkerF
          onLoad={onMarkerLoad}
          onUnmount={onMarkerUnmount}
          position={center}
          icon={{
            path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: "yellow",
            fillOpacity: 0.9,
            scale: 2,
            strokeColor: "gold",
            strokeWeight: 2,
          }}
        />
      )}

      {children}
    </GoogleMap>
  );
};

export default Map;
