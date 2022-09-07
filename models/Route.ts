import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IRoute extends Document {
  title: string;
  location: { lat: number; lng: number };
  description: string;
  difficulty: {
    value: number;
    label: string;
  };
  features: string[];
  path: number[][];
  author: string;
  imgUrl: string;
}

const routeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: [50, "Title cannot be longer than 50 characters"],
  },
  location: { lat: Number, lng: Number },
  description: {
    type: String,
    maxLength: [800, "Description cannot be longer than 800 characters"],
  },
  difficulty: {
    value: { type: Number, integer: true, min: 1, max: 30 },
    label: String,
  },
  features: [String],
  path: [[Number]],
  author: String,
  imgUrl: String,
});

routeSchema.pre("save", async function (next) {
  const route = this;
  let gradeVal = route.diffculty.value;
  const frenchGrades = [
    "4a",
    "4b",
    "4c",
    "5a",
    "5b",
    "5c",
    "6a",
    "6a+",
    "6b",
    "6b+",
    "6c",
    "6c+",
    "7a",
    "7a+",
    "7b",
    "7b+",
    "7c",
    "7c+",
    "8a",
    "8a+",
    "8b",
    "8b+",
    "8c",
    "8c+",
    "9a",
    "9a+",
    "9b",
  ];
  route.diffculty.label = frenchGrades[gradeVal - 1];
  next();
});

const Route: Model<IRoute> =
  mongoose.models.Route || model("Route", routeSchema);
export default Route;
