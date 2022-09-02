import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import style from "../../styles/routeCanvas.module.css";
// konva
import Konva from "konva";
import { Stage, Layer, Line, Image } from "react-konva";
import { useSession } from "next-auth/react";
import ImageLayer from "./ImageLayer";
import RouteLine from "./RouteLine";
import RouteJoints from "./RouteJoints";
import { drawLine } from "./tools";

interface RouteCanvasProps {
  imageUrl: string;
}

function RouteCanvas({ imageUrl }: RouteCanvasProps) {
  const session = useSession();
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<Konva.Line>(null);

  const canvasRef = useRef<Konva.Stage>(null);

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const [jointCoords, setJointCoords] = useState<number[][]>([]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  useEffect(() => {
    const handleResize = () => {
      if (parentContainerRef.current) {
        setCanvasSize({
          width: parentContainerRef.current.clientWidth,
          height: parentContainerRef.current.clientHeight,
        });

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

    setJointCoords([...jointCoords, convertedCoords]);

    //drawLine

    // is on the other point

    // setWithinCanvas(true);

    // const withinElement =
    //   routePath.joints.filter((joint) =>
    //     isWithinElement(pos.x, pos.y, joint, circle.radius)
    //   ).length > 0;
    // if (!withinElement) {
    //   handleCanvasChange([
    //     ...routePath.joints,
    //     [pos.x / canvasSize.width, pos.y / canvasSize.height],
    //   ]);
    // } else {
    //   setWithinCanvas(true);
    // }
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
                circleRadius={8}
                canvasWidth={canvasSize.width}
                canvasHeight={canvasSize.height}
                jointCoords={joint}
              />
            ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default RouteCanvas;
