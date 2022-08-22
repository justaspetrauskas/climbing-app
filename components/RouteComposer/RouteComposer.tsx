import Image from "next/image";
import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { useSelector } from "react-redux";
import { selectNewRouteState } from "../../redux/store";

import style from "../../styles/routeComposer.module.css";

const RouteComposer = () => {
  const routeState = useSelector(selectNewRouteState);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );
  return (
    <div className={style.wrapper}>
      <div className={style["image-wrapper"]}>
        <Cropper
          image={routeState.imagePreview}
          crop={crop}
          //   rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          //   onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  );
};

export default RouteComposer;
