import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import style from "./routeCanvas.module.css";
// konva
import Konva from "konva";
import { Stage, Layer, Line, Image, Text } from "react-konva";
import { useSession } from "next-auth/react";
import ImageLayer from "./ImageLayer";
import RouteLine from "./RouteLine";
import RouteJoints from "./RouteJoints";
import { isWithinAnyElement, isWithinCanvas, responsivePoints } from "./tools";
import { useDispatch, useSelector } from "react-redux";
import {
  setJointCoords,
  setValidated,
  updateJointCoords,
} from "../../../redux/slices/canvasState";
import { setRoute } from "../../../redux/slices/newRouteReducer";
import {
  selectCanvasState,
  selectNewRouteState,
  selectRouteComposerState,
} from "../../../redux/store";
import FormLayout from "../FormLayout";
import CanvasControls from "./CanvasControls";
import InputFieldContainer from "../../UILayout/InputFieldContainer/InputFieldContainer";
import CanvasExplanation from "./CanvasExplanation";
import { setValidateStep } from "../../../redux/slices/routeComposerReducer";

const radiusMultiplier: number = 5;
const lineColor: string = "#274546";
const jointColor: string = "#ffd447";

function RouteCanvas() {
  const session = useSession();
  const { imageUrl } = useSelector(selectNewRouteState);

  const dispatch = useDispatch();
  const { jointCoords, howToEdit, editMode } = useSelector(selectCanvasState);

  const parentContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<Konva.Stage>(null);

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const [jointRadius, setJointRadius] = useState(8);
  const [withinCanvasEl, setWithinCanvasEl] = useState(true);

  const [translatedCoords, setTranslatedCoords] = useState<number[][]>([]);

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
        setJointRadius(Math.ceil(ratio * radiusMultiplier));
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [jointCoords]);

  useEffect(() => {
    if (jointCoords.length > 2) {
      dispatch(setValidateStep(true));
      dispatch(setRoute(jointCoords));
    } else {
      dispatch(setValidateStep(false));
    }
  }, [jointCoords]);

  useEffect(() => {
    if (jointCoords) {
      // resize points
      const translatedJointCords = jointCoords.map((joint) => {
        const translatedX = canvasSize.width * joint[0];
        const translatedY = canvasSize.height * joint[1];
        return [translatedX, translatedY];
      });
      console.log("jointCoords coordinates", jointCoords);
      setTranslatedCoords(translatedJointCords);
      console.log("Adjusted coordinates", translatedCoords);
    }
  }, [jointCoords, canvasSize]);

  const handleClick = (e: any) => {
    const clickPos = e.target.getStage().getPointerPosition();
    setWithinCanvasEl(true);
    //convert to array
    let convertedCoords = Object.values(clickPos) as number[];
    // make poinst responsive
    const responsiveCoords = responsivePoints(
      parentContainerRef,
      convertedCoords
    );
    console.log(jointCoords);
    console.log(responsiveCoords);
    // console.log("responsiveCoords: ", responsiveCoords);
    //check if not on the any other point
    const insideElement: boolean = isWithinAnyElement(
      jointCoords,
      responsiveCoords,
      jointRadius
    );
    dispatch(setJointCoords(responsiveCoords));

    // if (!insideElement && !editMode) dispatch(setJointCoords(responsiveCoords));
    if (insideElement && editMode && jointCoords.length > 1) {
      // remove the joint
      const jointsCopy = [...jointCoords];
      const filteredJoints = jointsCopy.filter(
        (joint) => joint[0] !== clickPos.x && joint[1] !== clickPos.y
      );
      dispatch(updateJointCoords(filteredJoints));
    }
  };

  const handleDragMove = (e: any) => {
    // console.log(e, typeof e);
    const jointIndex = e.target.index;
    let jointPos = e.target.getStage().getPointerPosition();
    const { width, height } = canvasSize;
    const { x, y } = jointPos;
    // check if jointPos is within canvas
    const isWithinCanvasEl = isWithinCanvas(x, y, jointRadius, width, height);
    if (isWithinCanvasEl) {
      const jointsCopy = [...jointCoords];
      jointsCopy[jointIndex] = [x, y];
      dispatch(updateJointCoords(jointsCopy));
      setWithinCanvasEl(true);
    } else {
      // stop dragging
      setWithinCanvasEl(false);
    }
  };

  const handleMouseDown = (e: any) => {
    console.log("Mouse down action", e);
    // check if click is within canvas
    const jointPos = e.target.getStage().getPointerPosition();
    const { width, height } = canvasSize;
    const { x, y } = jointPos;
    const isWithinCanvasEl = isWithinCanvas(x, y, jointRadius, width, height);
    if (isWithinCanvasEl) setWithinCanvasEl(isWithinCanvasEl);
  };

  const handleLineClick = (e: any) => {
    // find position where clicked happend
    const clickPos = e.target.getStage().getPointerPosition();
    console.log("clicked on the line", clickPos);

    // get current joint coords

    // add points between neighbors
  };

  if (imageUrl) {
    return (
      <FormLayout>
        <InputFieldContainer label={"Draw a problem"} />
        <CanvasControls />
        <div className={style.wrapper} ref={parentContainerRef}>
          {howToEdit && <CanvasExplanation />}
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
              <RouteLine
                lineColor={lineColor}
                lineClick={handleLineClick}
                jointCoords={translatedCoords}
              />
            </Layer>
            <Layer>
              {translatedCoords.length > 0 &&
                translatedCoords.map((joint, i) => (
                  <RouteJoints
                    key={i}
                    circleRadius={
                      i === 0 || i === translatedCoords.length - 1
                        ? jointRadius * 1.6
                        : jointRadius
                    }
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                    jointCoords={joint}
                    handleDragMove={handleDragMove}
                    handleMouseDown={handleMouseDown}
                    draggable={withinCanvasEl}
                    jointColor={
                      i === 0 || i === translatedCoords.length - 1
                        ? "white"
                        : jointColor
                    }
                  />
                ))}
            </Layer>
          </Stage>
        </div>
      </FormLayout>
    );
  } else {
    return <div>Error</div>;
  }
}

export default RouteCanvas;
