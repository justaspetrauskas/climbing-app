import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import style from "../../styles/routeCanvas.module.css";
// konva
import Konva from "konva";
import { Stage, Layer, Circle, Line, Image } from "react-konva";

interface RouteCanvasProps {
  imageUrl: string;
}

function RouteCanvas({ imageUrl }: RouteCanvasProps) {
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<Konva.Line>(null);
  const circleRef = useRef<Konva.Circle>(null);
  const canvasRef = useRef<Konva.Stage>(null);

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

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

  return (
    <div className={style.wrapper} ref={parentContainerRef}>
      <Stage
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        // onClick={handleClick}
      ></Stage>
    </div>
  );
}

export default RouteCanvas;
