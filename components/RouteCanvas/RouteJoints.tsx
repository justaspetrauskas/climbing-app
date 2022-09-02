import Konva from "konva";
import React, { useRef } from "react";
import { Circle } from "react-konva";
interface RouteJointsProps {
  circleRadius: number;
  canvasWidth: number;
  canvasHeight: number;
  jointCoords: number[];
}
const RouteJoints = ({
  jointCoords,
  circleRadius,
  canvasWidth,
  canvasHeight,
}: RouteJointsProps) => {
  const circleRef = useRef<Konva.Circle>(null);

  return (
    <Circle
      x={jointCoords[0]}
      y={jointCoords[1]}
      radius={circleRadius}
      fill={"blue"}
      ref={circleRef}
      //   draggable={mode ? false : withinCanvas}
      //   onDragMove={mode ? null : handleDragMove}
      //   onMouseEnter={scaleUp}
      //   onMouseLeave={scaleDown}
    />
  );
};

export default RouteJoints;
