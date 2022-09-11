import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-konva";
import { useSelector } from "react-redux";
import { selectJointCoords, selectNewRouteState } from "../../../redux/store";
import { drawLine } from "../../../lib/canvasTools";
interface RouteLineProps {
  jointCoords: number[][];
  lineColor: string;
  lineClick: (e?: any) => void;
}
const RouteLine = ({
  jointCoords,
  lineClick,
  lineColor = "blue",
}: RouteLineProps) => {
  const lineRef = useRef<Konva.Line>(null);

  // const [flattenedPoints, setFlattenedPoints] = useState<number[]>([]);

  // useEffect(() => {
  //   if (jointCoords) {
  //     console.log("lince coords", jointCoords);
  //     let points = drawLine(jointCoords);
  //     setFlattenedPoints(points);
  //   }
  // }, [jointCoords]);

  return (
    <Line
      ref={lineRef}
      points={drawLine(jointCoords)}
      tension={0.5}
      stroke={lineColor}
      shadowColor="white"
      shadowBlur={2}
      strokeWidth={3}
      onClick={lineClick}
    />
  );
};

export default RouteLine;
