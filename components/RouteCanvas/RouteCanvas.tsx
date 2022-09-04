import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import style from "../../styles/routeCanvas.module.css";
// konva
import Konva from "konva";
import { Stage, Layer, Line, Image } from "react-konva";
import { useSession } from "next-auth/react";
import ImageLayer from "./ImageLayer";
import RouteLine from "./RouteLine";
import RouteJoints from "./RouteJoints";
import { isWithinAnyElement, isWithinCanvas } from "./tools";
import { useDispatch, useSelector } from "react-redux";
import {
  setJointCoords,
  updateJointCoords,
} from "../../redux/slices/newRouteReducer";
import { selectJointCoords } from "../../redux/store";

interface RouteCanvasProps {
  imageUrl: string;
}

const radiusMultiplier: number = 6;

function RouteCanvas({ imageUrl }: RouteCanvasProps) {
  const session = useSession();
  const dispatch = useDispatch();
  const jointCoords = useSelector(selectJointCoords);

  const parentContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<Konva.Stage>(null);

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const [jointRadius, setJointRadius] = useState(8);

  const [withinCanvasEl, setWithinCanvasEl] = useState(true);

  useEffect(() => {
    console.log(session);
  }, [session]);

  useEffect(() => {
    const handleResize = () => {
      if (parentContainerRef.current) {
        const ratio =
          parentContainerRef.current.clientWidth /
          parentContainerRef.current.clientHeight;

        setCanvasSize({
          width: parentContainerRef.current.clientWidth,
          height: parentContainerRef.current.clientHeight,
        });
        setJointRadius(ratio * radiusMultiplier);

        // resize points
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e: any) => {
    const pos = e.target.getStage().getPointerPosition();
    //convert to array
    let convertedCoords = Object.values(pos) as number[];
    //check if not on the any other point
    const insideElement: boolean = isWithinAnyElement(
      jointCoords,
      convertedCoords,
      jointRadius
    );

    if (!insideElement) dispatch(setJointCoords(convertedCoords));
  };

  const handleDragMove = (e: any) => {
    console.log(e, typeof e);
    const jointIndex = e.target.index;
    let jointPos = e.target.getStage().getPointerPosition();
    const { width, height } = canvasSize;
    const { x, y } = jointPos;
    // check if jointPos is within canvas
    const isWithinCanvasEl = isWithinCanvas(x, y, jointRadius, width, height);
    if (isWithinCanvasEl) {
      const jointsCopy = [...jointCoords];
      jointsCopy[jointIndex - 1] = [x, y];
      dispatch(updateJointCoords(jointsCopy));
      setWithinCanvasEl(true);
    } else {
      // stop dragging
      setWithinCanvasEl(false);
    }
  };

  return (
    <div className={style.wrapper} ref={parentContainerRef}>
      <Stage
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        // style={{
        //   backgroundImage: `url(${imageUrl})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        onClick={handleClick}
      >
        <Layer>
          <ImageLayer imageUrl={imageUrl} />
        </Layer>
        <Layer>
          <RouteLine jointCoords={jointCoords} />
          {jointCoords.length > 0 &&
            jointCoords.map((joint, i) => (
              <RouteJoints
                key={i}
                circleRadius={jointRadius}
                canvasWidth={canvasSize.width}
                canvasHeight={canvasSize.height}
                jointCoords={joint}
                handleDragMove={handleDragMove}
                draggable={withinCanvasEl}
              />
            ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default RouteCanvas;
