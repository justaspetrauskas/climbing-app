export const drawLine = (arr: number[][]) => {
  //flattenPoints
  let flattenedPoints = arr.flat();
  return flattenedPoints;
};

// export const isWithinTargetRadius = (
//   posX: number,
//   posY: number,
//   element,
//   radius: number
// ) => {
//   const { x, y } = element.attrs;
//   const minX = Math.min(x - radius, x + radius);
//   const maxX = Math.max(x - radius, x + radius);
//   const minY = Math.min(y - radius, y + radius);
//   const maxY = Math.max(y - radius, y + radius);
//   if (posX >= minX && posX <= maxX && posY >= minY && posY <= maxY) {
//     return true;
//   } else {
//     return false;
//   }
// };
export const isWithinElement = (
  posX: number,
  posY: number,
  element: number[],
  radius: number
) => {
  const [x, y] = element;
  const minX = Math.min(x - radius, x + radius);
  const maxX = Math.max(x - radius, x + radius);
  const minY = Math.min(y - radius, y + radius);
  const maxY = Math.max(y - radius, y + radius);
  if (posX >= minX && posX <= maxX && posY >= minY && posY <= maxY) {
    return true;
  } else {
    return false;
  }
};
