export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  console.log("lat1: " + lat1 + ", lon1: " + lon1);
  const R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  return d;
}
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const getLocationDistancesAndSort = (
  arr: Record<string, any>[],
  myLat: number,
  myLng: number
) => {
  const locations = arr
    .map((element) => {
      let distance = getDistanceFromLatLonInKm(
        myLat,
        myLng,
        element.routeLocation.lat,
        element.routeLocation.lng
      );
      element.distance_to = distance.toPrecision(2);
      return element;
    })
    .sort((a, b) =>
      a.distance_to > b.distance_to ? 1 : b.distance_to > a.distance_to ? -1 : 0
    );
  return locations;
};

// export const locationsNearbyArr = (arr, myLat, myLng, radius) => {
//   let nearbyLocations = [];
//   let nearbyDistance;
//   arr.forEach((element) => {
//     let distance = getDistanceFromLatLonInKm(
//       myLat,
//       myLng,
//       element.coordinates.lat,
//       element.coordinates.lng
//     );
//     element.distance_to = distance;
//     nearbyLocations.push(element);

//     if (distance < radius) {
//       let nearbyDistance = Number.parseFloat(distance).toPrecision(1);
//       nearbyLocations.push(element);
//     }
//   });

//   return nearbyLocations;
// };
