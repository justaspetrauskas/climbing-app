import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import style from "./routeCanvas.module.css";
// konva
import Konva from "konva";
import { Stage, Layer, Line, Image, Text } from "react-konva";
import { useSession } from "next-auth/react";
import ImageLayer from "./ImageLayer";
import RouteLine from "./RouteLine";
import RouteJoints from "./RouteJoints";
import { isWithinAnyElement, isWithinCanvas } from "./tools";
import { useDispatch, useSelector } from "react-redux";
import {
  setJointCoords,
  updateJointCoords,
} from "../../../redux/slices/newRouteReducer";
import { selectJointCoords, selectNewRouteState } from "../../../redux/store";
import FormLayout from "../FormLayout";
import useImage from "use-image";
import CanvasControls from "./CanvasControls";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";
import CanvasExplanation from "./CanvasExplanation";

const radiusMultiplier: number = 5;
const lineColor: string = "#274546";
const jointColor: string = "#ffd447";

function RouteCanvas() {
  const session = useSession();

  const { imageUrl } = useSelector(selectNewRouteState);
  const [image] = useImage(imageUrl);
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
  }, [image]);

  useEffect(() => {
    console.log(image?.height, image?.width);
  }, [image]);

  const handleClick = (e: any) => {
    const clickPos = e.target.getStage().getPointerPosition();
    setWithinCanvasEl(true);
    //convert to array
    let convertedCoords = Object.values(clickPos) as number[];
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

  const handleMouseDown = (e: any) => {
    // check if click is within canvas
    const jointPos = e.target.getStage().getPointerPosition();

    const { width, height } = canvasSize;
    const { x, y } = jointPos;
    console.log("jointPos: ", x, y);
    const isWithinCanvasEl = isWithinCanvas(x, y, jointRadius, width, height);
    if (isWithinCanvasEl) setWithinCanvasEl(isWithinCanvasEl);
  };
  if (imageUrl && image) {
    return (
      <FormLayout>
        <InputFieldContainer label={"Draw a problem"} />

        <div className={style.wrapper} ref={parentContainerRef}>
          {/* <CanvasExplanation /> */}
          <Stage
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            //  style={{ position: "relative" }}
            onClick={handleClick}
          >
            <Layer>
              <RouteLine lineColor={lineColor} jointCoords={jointCoords} />
            </Layer>
            <Layer>
              {jointCoords.length > 0 &&
                jointCoords.map((joint, i) => (
                  <RouteJoints
                    key={i}
                    circleRadius={jointRadius}
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                    jointCoords={joint}
                    handleDragMove={handleDragMove}
                    handleMouseDown={handleMouseDown}
                    draggable={withinCanvasEl}
                    jointColor={
                      i === 0 || i === jointCoords.length - 1
                        ? "white"
                        : jointColor
                    }
                  />
                ))}
            </Layer>
          </Stage>
        </div>
        <CanvasControls />
      </FormLayout>
    );
  } else {
    return <div>Error</div>;
  }
}

export default RouteCanvas;
