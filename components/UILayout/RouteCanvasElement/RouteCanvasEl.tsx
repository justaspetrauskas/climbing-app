import React, { useRef, useEffect, useState, useMemo } from "react";
import Konva from "konva";
import { Stage, Layer, Line, Circle } from "react-konva";
import {
  drawLine,
  getCanvasToWindowRatio,
  translatePoints,
} from "../../../lib/canvasTools";

interface RouteCanvasElProps {
  imageUrl: string;
  path: number[][];
  radiusMultiplier?: number;
  lineColor?: string;
  jointColor?: string;
}
const RouteCanvasEl = ({
  imageUrl,
  path,
  radiusMultiplier = 3,
  lineColor = "#274546",
  jointColor = "#ffd447",
}: RouteCanvasElProps) => {
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<Konva.Stage>(null);
  const lineRef = useRef<Konva.Line>(null);
  const circleRef = useRef<Konva.Circle>(null);

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const [jointRadius, setJointRadius] = useState(8);
  const [translatedPoints, setTranslatedPoints] = useState<number[][]>([]);

  useEffect(() => {
    console.log(path);
  }, [path]);

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

        setJointRadius(
          Math.round(
            getCanvasToWindowRatio(window, parentContainerRef) *
              radiusMultiplier
          )
        );
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (path) {
      // resize points
      const { width, height } = canvasSize;
      const translatedPoints = translatePoints(path, width, height);
      setTranslatedPoints(translatedPoints);
    }
  }, [path, canvasSize]);

  return (
    <div
      className="relative max-w-full aspect-cropAspectRatio rounded-lg overflow-hidden"
      ref={parentContainerRef}
    >
      <Stage
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Layer>
          <Line
            ref={lineRef}
            points={drawLine(translatedPoints)}
            tension={0.5}
            stroke={lineColor}
            shadowColor="white"
            shadowBlur={2}
            strokeWidth={3}
          />
          {translatedPoints.length > 0 &&
            translatedPoints.map((joint, i) => (
              <Circle
                key={i}
                ref={circleRef}
                radius={
                  i === 0 || i === path.length - 1
                    ? jointRadius * 1.6
                    : jointRadius
                }
                x={joint[0]}
                y={joint[1]}
                draggable={false}
                fill={i === 0 || i === path.length - 1 ? "white" : jointColor}
              />
            ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default RouteCanvasEl;
