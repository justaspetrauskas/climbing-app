import mongoose, { Schema, model, Model, connect, Document } from "mongoose";
import { getDistanceFromLatLonInKm } from "../lib/distanceTools";

interface TestRoute {
  name: string;
  routeLocation: { lat: number; lng: number };
}

export interface TestRouteMethods {
  //   distanceTo(lat: number, lng: number): any;
  fullName(): string;
}

export type TestRouteModel = Model<TestRoute, {}, TestRouteMethods>;

// 2. Create a Schema corresponding to the document interface.
const testRouteSchema = new Schema<TestRoute, TestRouteModel, TestRouteMethods>(
  {
    name: { type: String, required: true },
    routeLocation: { lat: Number, lng: Number },
  },
  { timestamps: true }
);

// testRouteSchema.method.distanceTo = function (lat, lng) {
//   const route = this;
//   const routeObject = route.toObject();
//   console.log(lat, lng);
//   routeObject["distance_to"] = 12;
//   //   const { lat, lng } = location;
//   //   routeObject["distance_to"] = `${getDistanceFromLatLonInKm(
//   //     +routeObject.routeLocation.lng,
//   //     +routeObject.routeLocation.lat,
//   //     +lat,
//   //     +lng
//   //   )}`;

//   return routeObject;
// };

testRouteSchema.method("fullName", function fullName() {
  return this.name + " " + this.routeLocation.lat;
});

// 3. Create a Model.
const TestRoute =
  mongoose.models.TestRoute ||
  model<TestRoute, TestRouteModel>("TestRoute", testRouteSchema);
export default TestRoute;
