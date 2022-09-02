import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-konva";
import { drawLine } from "./tools";
interface RouteLineProps {
  jointCoords: number[][];
}
const RouteLine = ({ jointCoords }: RouteLineProps) => {
  const lineRef = useRef<Konva.Line>(null);
  const [flattenedPoints, setFlattenedPoints] = useState<number[]>([]);
  useEffect(() => {
    if (jointCoords) {
      let points = drawLine(jointCoords);
      setFlattenedPoints(points);
    }
  }, [jointCoords]);

  return (
    <Line
      ref={lineRef}
      points={flattenedPoints}
      tension={0.5}
      stroke={`blue`}
      shadowColor="white"
      shadowBlur={2}
      strokeWidth={3}
    />
  );
};

export default RouteLine;
