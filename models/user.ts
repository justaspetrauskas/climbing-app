import mongoose, { Document, model, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { AvatarGenerator } from "random-avatar-generator";

const avatar = new AvatarGenerator();

export interface IUser extends Document {
  title: string;
  emailt: string;
  password: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  avatar: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: [100, "Name can't be longer than 100 characters"],
  },
  email: {
    type: String,
    unique: [true, "Such email already exists"],
  },
  password: { type: String },
  tokens: {
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  avatar: { type: String },
  //   climbedRoutes: [{ type: Schema.Types.ObjectId, ref: "Route" }],
  //   savedRoutes: [{ type: Schema.Types.ObjectId, ref: "Route" }],
});

userSchema.pre("save", async function (next) {
  const user = this;
  const plainpassword = user.password;
  //   const username = user.email.split("@")[0];
  //   user.username = username;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(plainpassword, 10);
  }
  next();
});

userSchema.pre("save", async function (next) {
  const user = this;
  let userAvatar = avatar.generateRandomAvatar();
  user.avatar = userAvatar;
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.checkCredentials = async function (email, plainpassword) {
  const user = await this.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(plainpassword, user.password);
    if (isMatch) return user;
    else return null;
  } else return null;
};

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);
export default User;
