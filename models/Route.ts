import mongoose, {
  Document,
  model,
  Model,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";
import { IUser, IUserModel, IUserDocument } from "./User";

export interface IRoute {
  title: string;
  routeLocation: { lat: number; lng: number };
  description: string;
  difficulty: number;
  features: string[];
  path: number[][];
  author: Types.ObjectId;
  imageUrl: string;
}

export interface IRouteDocument extends IRoute, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IRouteModel extends Model<IRoute> {}

const routeSchema = new Schema<IRoute, IRouteDocument, IRouteModel>(
  {
    title: {
      type: String,
      required: true,
      maxLength: [50, "Title cannot be longer than 50 characters"],
    },
    routeLocation: { lat: Number, lng: Number },
    description: {
      type: String,
      maxLength: [800, "Description cannot be longer than 800 characters"],
    },
    difficulty: { type: Number, integer: true, min: 1, max: 30 },

    features: [String],
    path: [[Number]],
    author: { type: Schema.Types.ObjectId, ref: "UserSchema" },
    imageUrl: String,
  },
  { timestamps: true }
);

const Route =
  mongoose.models.Route || model<IRoute, IRouteModel>("Route", routeSchema);
export default Route;
