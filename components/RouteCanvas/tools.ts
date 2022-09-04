export const drawLine = (arr: number[][]) => {
  //flattenPoints
  let flattenedPoints = arr.flat();
  return flattenedPoints;
};

export const isWithinCanvas = (
  posX: number,
  posY: number,
  radius: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  return (
    posX + radius < canvasWidth &&
    posX - radius > 0 &&
    posY - radius > 0 &&
    posY + radius < canvasHeight
  );
};
const isWithinSingleElement = (
  currPos: number[],
  element: number[],
  radius: number
) => {
  const [currX, currY] = currPos;
  const [x, y] = element;
  const minX = Math.min(x - radius, x + radius);
  const maxX = Math.max(x - radius, x + radius);
  const minY = Math.min(y - radius, y + radius);
  const maxY = Math.max(y - radius, y + radius);
  if (currX >= minX && currX <= maxX && currY >= minY && currY <= maxY) {
    return true;
  } else {
    return false;
  }
};

export const isWithinAnyElement = (
  arr: number[][],
  currPos: number[],
  jointRadius: number
) => {
  const isTrue =
    arr.filter((joint) => isWithinSingleElement(currPos, joint, jointRadius))
      .length > 0
      ? true
      : false;

  return isTrue;
};
