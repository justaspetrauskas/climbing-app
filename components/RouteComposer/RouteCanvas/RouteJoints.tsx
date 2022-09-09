import Konva from "konva";
import React, { useRef } from "react";
import { Circle, Layer, Text } from "react-konva";
interface RouteJointsProps {
  circleRadius: number;
  canvasWidth: number;
  canvasHeight: number;
  jointCoords: number[];
  handleDragMove: (e: any) => void;
  handleMouseDown?: (e: any) => void;
  draggable: boolean;
  jointColor: string;
}
const RouteJoints = ({
  jointCoords,
  circleRadius = 8,
  handleDragMove,
  draggable,
  handleMouseDown,
  jointColor = "blue",
}: RouteJointsProps) => {
  const circleRef = useRef<Konva.Circle>(null);

  const handleMouseOver = () => {
    console.log(circleRef.current);
  };

  const handleMouseClick = () => {
    console.log(circleRef.current, " says hello");
  };

  return (
    <Circle
      x={jointCoords[0]}
      y={jointCoords[1]}
      radius={circleRadius}
      fill={jointColor}
      ref={circleRef}
      draggable={draggable}
      onDragMove={handleDragMove}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseClick={handleMouseClick}
      //   onMouseLeave={scaleDown}
    />
  );
};

export default RouteJoints;
