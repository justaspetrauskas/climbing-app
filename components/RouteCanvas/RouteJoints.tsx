import Konva from "konva";
import React, { useRef } from "react";
import { Circle } from "react-konva";
interface RouteJointsProps {
  circleRadius: number;
  canvasWidth: number;
  canvasHeight: number;
  jointCoords: number[];
  handleDragMove: (e: any) => void;
  handleMouseDown?: (e: any) => void;
  draggable: boolean;
}
const RouteJoints = ({
  jointCoords,
  circleRadius = 8,
  handleDragMove,
  draggable,
  handleMouseDown,
}: RouteJointsProps) => {
  const circleRef = useRef<Konva.Circle>(null);

  return (
    <Circle
      x={jointCoords[0]}
      y={jointCoords[1]}
      radius={circleRadius}
      fill={"blue"}
      ref={circleRef}
      draggable={draggable}
      onDragMove={handleDragMove}
      onMouseDown={handleMouseDown}
      //   onMouseLeave={scaleDown}
    />
  );
};

export default RouteJoints;
